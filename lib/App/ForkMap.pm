package App::ForkMap;

use utf8;
use strict;
use warnings;

use base 'Exporter';

use Carp 'croak';

use IO::Pipe;
use IO::Handle;
use IO::Select;
use POSIX ':sys_wait_h';

use JSON::XS;

our @EXPORT_OK = qw( fmap );

our $VERSION     = '0.1.1';
our $MAX_PROCESS = 10;


my $j = JSON::XS->new->utf8->canonical->allow_nonref->allow_unknown->allow_blessed->convert_blessed;

# Принудительное ожидание кодов завершения порожденных процессов
# (профилактика zombie processes)
local $SIG{CHLD} = sub { 1 while ( waitpid( -1, POSIX::WNOHANG ) > 0 ) };

sub fmap ( &@ ) {
    my ( $fn, @args ) = @_;

    my @rs;
    my $s = IO::Select->new;

    while ( my @slice_args = splice( @args, 0, $MAX_PROCESS ) ) {
        my $pids = [];

        for ( @slice_args ) {
            my $pipe = IO::Pipe->new;
            my $pid  = fork();

            croak "Can't fork a child: $!" unless defined $pid;

            if ( $pid ) {
                # Parent
                push @$pids, $pid;
                my $rh = $pipe->reader;
                $rh->blocking( 0 );
                $s->add( $rh );
            } else {
                # Child
                my $result = $fn->( $_ );
                my $wh = $pipe->writer;
                $wh->autoflush;
                syswrite $wh, $j->encode( $result ) if $result;
                POSIX::_exit( 0 );
            }
        }

        # Обработка кодов завершения порожденных процессов текущей итерации
        for ( @$pids ) {
            if ( waitpid( $_, 0 ) > 0 ) {
                # Определение контекста завершения процесса
                my ( $rc, $sig, $core ) = ( $? >> 8, $? & 127, $? & 128 );

                croak "$_ dumped core" if $core;

                if ( $sig ) {
                    croak "$_ was murdered" if $sig == 9;
                    croak "$_ returned $rc after receiving signal $sig";
                }
            }
        }
    }

    # Чтение данных, отправленных от потомка родителю
    while ( my @ready_handlers = $s->can_read ) {
        for my $rh ( @ready_handlers ) {
            push @rs, $j->decode( $rh->getline );
            $s->remove( $rh );
            $rh->close;
        }
    }

    return @rs;
}

1;

__END__

=encoding utf8

=head1 NAME

App::ForkMap

=head1 SYNOPSIS

  use App::ForkMap 'fmap';

  sub foo {
      my $param = shift;
      ...
      return $result;
  }

  my @result = fmap { foo( $_ ) } @list_with_entitites;

=head1 DESCRIPTION

Имплементация map-функции для параллельной обработки элементов списка.

=head1 METHODS

=head2 fmap( &@ )

Применить функцию-обработчик для каждого элемента списка.
Для каждого элемента списка фукнция обработчик выносится в отдельный процесс.

Args:

  $fn   - ссылка на фукнцию-обработчик
  @args - список, каждый элемент которого будет обработан в отдельном процессе

Returns:

  @rs - результат обработки элементов входного массива

=cut
