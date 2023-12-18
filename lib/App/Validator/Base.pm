package App::Validator::Base;

use utf8;
use strict;
use warnings FATAL => 'all';

use Mojo::Base 'Mojolicious::Validator::Validation';
use Mojolicious::Validator;

sub new {
    return shift->SUPER::new(validator => Mojolicious::Validator->new);
}

1;
