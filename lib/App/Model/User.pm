package App::Model::User;

use base App::Model::Base;

use strict;
use warnings;

use Carp 'croak';
use Digest::MD5 qw(md5_hex);
use Digest::SHA qw(sha256_hex);


sub new {
    my ($class, %args) = @_;

    my $self = {
        app    => $args{app},
        table  => 'users',
        fields => [qw/id username email uid password first_name last_name
                      avatar created last_visited is_activated is_admin/]
    };

    return bless $self, $class;
}

sub create {
    my ($s, $data) = @_;

    $data->{uid}      = $s->_generate_uid($data->{email} . $data->{username});
    $data->{password} = md5_hex('' . $data->{password} . $s->app->conf->{salt});

    my @values;
    my $fields = [ keys %$data ];

    my $sql =
          'INSERT INTO '
        . $s->table . ' ('
        . (join ',', @$fields) . ')'
        . ' VALUES ('
        . (join ',', ('?') x @$fields) . ')';

    push @values, $data->{$_} for (@$fields);

    return $s->insert($sql, @values);
}

sub list {
    my ($s, %param) = @_;

    my $page        = $param{page};
    my $sort_by     = $param{sort_by};
    my $search_term = $param{search_term};

    return $s->find(
        [qw/id username email avatar created is_activated is_admin/],
        {limit => 100}
    );
}

sub _generate_uid {
    my ($s, $value) = @_;
    return unless $value;
    return md5_hex($value . time . $s->app->conf->{salt});
}

1;
