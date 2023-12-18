package App::Controller::Admin::Api::V1;

use Mojo::Base 'App::Controller::Base';


sub init {
    my $s = shift;

    return $s->render_json({
        app_name => $s->app_name,
        versions => {
            lang      => 'Perl '  . $^V,
            app       => 'v'      . $s->version,
            framework => 'Mojo v' . $Mojolicious::VERSION,
        }
    });
}

1;

__END__
