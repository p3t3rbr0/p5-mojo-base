package App::Controller::User;

use Mojo::Base 'Mojolicious::Controller';

use Digest::MD5 qw(md5_hex);


sub authenticate {
    my $s = shift;

    # TODO: провалидировать данные
    my $username = $s->param('username');
    my $password = $s->param('password');

    if (my $u = $s->model('User')->get_by(undef, {username => $username})) {
        if (md5_hex("$password" . $s->app->conf->{salt}) eq $u->{password}) {

            my $user_data = {
                id           => $u->{id},
                username     => $u->{username},
                email        => $u->{username},
                is_auth      => 1,
                is_admin     => $u->{is_admin},
                is_activated => $u->{is_activated},
                created      => $u->{created},
                last_visited => $u->{last_visited}
            };

            $s->session($user_data);

            return $s->redirect_to('/');
        } else {
            return $s->redirect_to('login');
        }
    } else {
        return $s->redirect_to('login');
    }
}

sub logout {
    my $s = shift;
    $s->session(expires => 1);
    return $s->redirect_to($s->param('next') ? $s->param('next') : 'index');
}

sub login {
    my $s = shift;

    return $s->redirect_to('index') if $s->is_authenticated;

    return $s->render(template => 'user/login', errors => {})
        if $s->req->method eq 'GET';

    my $username    = $s->param('username');
    my $password    = $s->param('password');
    my $is_rememder = $s->param('is_remember') && $s->param('is_remember') eq 'on';
    my $u           = $s->model('User')->get(
        [qw/id username password avatar is_admin is_activated/],
        username => $username
    );

    return $s->render(
        template => 'user/login',
        errors => {username => "Пользователь '$username' не найден"}
    ) unless $u;

    unless (md5_hex("$password".$s->app->conf->{salt}) eq $u->{password}) {
        return $s->render(
            template => 'user/login',
            errors => {password => 'Некорректный пароль'}
        );
    }

    my $now = Time::Moment->now;

    $s->session(
        {
            user_id      => $u->{id},
            username        => $u->{username},
            avatar       => $u->{avatar},
            is_admin     => $u->{is_admin},
            is_activated => $u->{is_activated},
            last_visited   => $now
        },
        expires => $is_rememder ?
            $s->app->conf->{session}->{default_expiration}
            : undef
    );

    $s->model('User')->update({last_visited => $now}, id => $u->{id});

    return $s->redirect_to('index');
}

# sub logout {
#     my $s = shift;
#     $s->session(expires => 1);
#     return $s->redirect_to('admin/login');
# }

sub is_authenticated {
    my $s = shift;

    return $s->session('user_id') && $s->session('is_activated');
}

sub is_admin {
    my $s = shift;

    return $s->is_authenticated && $s->session('is_admin');
}

1;
