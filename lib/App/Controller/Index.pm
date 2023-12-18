package App::Controller::Index;

use Mojo::Base 'Mojolicious::Controller';

use utf8;


sub index {
    my $s = shift;

    return $s->render(template => 'index');
}

sub get_locales {
    my $s = shift;

    return $s->render_json($s->locales->{ru_RU} || {});
}

1;
