package App::Helpers;

use Mojo::Base 'Mojolicious::Plugin';

use App::Model;
use Geo::IP2Location::Lite;

use strict;
use warnings;

sub register {
    my ($s, $app) = @_;

    $app->helper(
        model => sub {
            my ($s, $model_name) = @_;
            my $model = App::Model->new(app => $app);
            return $model->get_model($model_name);
        }
    );

    $app->helper(
        in => sub {
            my ($s, $value, $array) = @_;
            return unless $value;
            return unless $array && @$array;
            return any { $value eq $_ } @$array;
        }
    );

    $app->helper(render_json => sub { my $s = shift; $s->render(json => @_); });
    $app->helper(render_text => sub { my $s = shift; $s->render(text => @_); });

    $app->helper(locales => sub { return $app->locales; } );

    $app->helper(i18n => sub {
        my ($s, $key) = @_;

        return unless $key;
        return $s->unpack_locale($key);
    });

    $app->helper(unpack_locale => sub {
        my ( $s, $key, $locale ) = @_;

        $locale //= $s->locales->{ru_RU};

        return $locale unless ref $locale;

        my @splitted_key = split /\./, $key;

        $key = shift @splitted_key;

        $locale = $locale->{$key} or die "locale with key=$key is undef";

        $s->unpack_locale(join('.', @splitted_key), $locale);
    });

    $app->helper(
        get_random_string => sub {
            my ($s, $count) = @_;
            $count = 1   if $count < 1;
            $count = 256 if $count > 256;
            my @chars = ('0' .. '9', 'A' .. 'F');
            my $r = join '' => map { $chars[ rand @chars ] } 1 .. $count;
            return $r;
        }
    );

    $app->helper(
        l => sub {
            my ($s, $msg) = @_;
            $s->app->logger($msg);
        }
    );

    $app->helper(
        get_ip => sub {
            my $s = shift;
            my $ip   = $s->req->headers->header('X-Real-IP');
            return $ip || ($s->tx->remote_address || '0.0.0.0');
        }
    );

    $app->helper(
        get_ip_info => sub {
            my ($s, $ip) = @_;
            my $obj          = Geo::IP2Location::Lite->open('bin/IP2LOCATION.BIN');
            my $countryshort = $obj->get_country_short($ip);
            my $countrylong  = $obj->get_country_long($ip);
            my $region       = $obj->get_region($ip);
            my $city         = $obj->get_city($ip);
        }
    );

    $app->helper(
        version => sub { return $_[0]->app->VERSION; }
    );

    $app->helper(
        app_name => sub { return $_[0]->app->conf->{app_name}; }
    );

    return;
}

1;
