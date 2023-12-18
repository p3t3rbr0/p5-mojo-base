package App;

use Mojo::Base 'Mojolicious';

use utf8;
use strict;
use warnings;

use File::Spec;
use Carp 'croak';

use DBI;
use JSON::XS;
use Mojo::Log;
use Mojo::Util 'monkey_patch';
use IO::Compress::Gzip 'gzip';

use App::Util qw(extend omit);

our $VERSION  = '0.0.0';

has conf  => sub {
    my $s = shift;

    return $s->mode eq 'production'
        ? do './conf/app.conf'
        : extend(do './conf/app.conf', do './conf/app-dev.conf');
};
has debug => sub { return Mojo::Log->new(level => 'debug', path => 'log/debug.log'); };
has db    => sub {
    my $s   = shift;

    my $cfg = $s->conf->{db};

    my $dbh = eval {
        DBI->connect(
            "dbi:SQLite:dbname=$cfg->{default}->{name}",
            '',  # no user
            '',  # no passwd
            {RaiseError => 1, PrintError => 1, AutoCommit => 1, sqlite_unicode => 1}
        );
    } or croak("DATABASE_CONNECTION_ERROR: $DBI::errstr");

    return $dbh;
};

has locales => sub {
    my $dirname = 'i18n';

    opendir(my $dh, $dirname) or croak "Can't open directory '$dirname': $!";

    my $locales = { map {
        $_ => do File::Spec->rel2abs(File::Spec->catfile($dirname, $_))
    } grep {
        -f File::Spec->catfile($dirname, $_)
    } readdir($dh) };

    closedir($dh);

    my $ru = extend({}, $locales->{'ru_RU'});
    $locales->{'en_US'} = extend($ru, $locales->{'en_US'});
    my $en = extend({}, $locales->{'en_US'});

    $locales->{$_} = extend($en, $locales->{$_})
        for (keys %{omit($locales, [qw/ru_RU en_US ja_JP/])});

    return $locales;
};

sub startup {
    my $app = shift;

    my $cfg = $app->conf;

    $app->mode($cfg->{mode});
    $app->config(hypnotoad => $cfg->{hypnotoad});
    $app->max_request_size($cfg->{max_request_size});

    $app->log(Mojo::Log->new({'level' => 'info', 'path' => 'log/app.log'}));

    $app->static->paths(['static']);
    $app->renderer->paths(['tmpl']);

    $app->secrets([ $cfg->{session}->{secret_key} ]);
    $app->sessions->cookie_name($cfg->{session}->{session_name});
    $app->sessions->default_expiration($cfg->{session}->{default_expiration});

    $app->hook(after_render => sub {
        my ($s, $body, $format) = @_;

        # Compress response body if enabled
        return unless ($s->req->headers->accept_encoding // '') =~ /gzip/i;
        $s->res->headers->append(Vary => 'Accept-Encoding');
        $s->res->headers->content_encoding('gzip');
        gzip $body, \my $gzipped;
        $$body = $gzipped;
    });

    $app->plugin('App::Helpers');

    # Replace default JSON parser (JSON::PP) on JSON::XS
    my $JB = JSON::XS->new->utf8;
    my $JT = JSON::XS->new;
    $_->canonical->allow_nonref->allow_unknown->allow_blessed->convert_blessed for $JB, $JT;
    monkey_patch "Mojo::JSON", 'encode_json', sub { $JB->encode($_[0]) };
    monkey_patch "Mojo::JSON", 'decode_json', sub { $JB->decode($_[0]) };
    monkey_patch "Mojo::JSON", 'to_json',     sub { $JB->encode($_[0]) };
    monkey_patch "Mojo::JSON", 'from_json',   sub { $JB->decode($_[0]) };

    my $r = $app->routes;

    my $auth = $r->under(sub {
        my $s = shift;

        my $is_auth = $s->session('user_id')
            && $app->model('User')->is_exists(id => $s->session('user_id'));

        return $s->redirect_to('login') unless $is_auth;
        return $is_auth;
    });

    ###
    ### Common
    ###
    $r->get('/')->to('index#index')->name('index');
    $r->any(['GET', 'POST'] => '/login')->to('user#login')->name('login');
    $r->post('/auth')->to('user#authenticate')->name('auth');
    $r->get('/locales')->to('index#get_locales');

    $auth->get('/logout')->to('user#logout')->name('logout');

    ###
    ### Admin
    ###
    my $admin = $auth->under( '/admin' => sub {
        my $s = shift;

        my $is_admin = $s->session('is_admin');

        return $s->redirect_to('login') unless $is_admin;
        return $is_admin;
    });


    # $r->any('/admin/login')->to('admin#login')->name('admin_login');

    $app->admin_routes($admin);

    return;
}

sub admin_routes {
    my ($app, $r) = @_;

    $r->any('/login')->to('admin#login')->name('admin_login');

    $r->get('/')->to('admin#index')->name('show_index');

    #
    # API V1
    #
    my $api  = $r->under('/api/v1');
    $api->get('/init')->to('admin-api-v1#init');

    # Users
    $api->get('/users')->to('admin-api-v1-user#get_list');
    $api->post('/users')->to('admin-api-v1-user#create');
    $api->get('/users/:id', [id => qr/\d+/])->to('admin-api-v1-user#get_details');
    $api->patch('/users/:id', [id => qr/\d+/])->to('admin-api-v1-user#edit');

    return;
}

1;
