package App::Util;

use utf8;
use strict;
use warnings;

use Carp 'croak';
use Exporter;
use base 'Exporter';

our @EXPORT_OK = qw(extend parse_argv omit);

sub parse_argv {
    my $argv = shift;

    my $mode = $argv && $argv =~ /^(development|production)$/x ? $argv : undef;

    print
        qq{\033[1;31mWARN: App mode requires ('development', 'production'). Example: carton exec $0 development; Now used default: development!\033[0m\n}
        unless $mode;

    $mode ||= 'development';

    return $mode;
}

sub extend {
    my ($h1, $h2) = @_;

    foreach (keys %$h2) {
        if (ref $h2->{$_} eq 'HASH') {
            extend($h1->{$_} ||= {}, $h2->{$_});
        } else {
            $h1->{$_} = $h2->{$_};
        }
    }

    return $h1;
}

sub symmetric_difference {
    my ($set_1, $set_2) = @_;

    return unless $set_1 && @$set_1 && $set_2 && @$set_2;

    my $count = {};
    for my $e (@$set_1, @$set_2) { $count->{$e}++; }

    return [grep {$count->{$_} == 1} keys %$count];
}

sub omit {
    my ($h_data, $keys) = @_;

    return unless $h_data && %$h_data && $keys && @$keys;

    my $h = {};

    for my $k ( @{symmetric_difference([keys %$h_data], $keys)} ) {
        $h->{$k} = $h_data->{$k};
    }

    return $h;
}


1;
