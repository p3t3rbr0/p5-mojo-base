package App::Validator::User;

use Mojo::Base 'App::Validator::Base';


sub validate_creation_data {
    my ($s, $creation_data) = @_;

    my $errors = {};

    $s->input($creation_data);

    $s->required('username', 'trim')->size(3, 50);
    $s->required('email', 'trim')
        ->size(6, 50)
        ->like(qr/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/im);

    $s->optional('first_name', 'trim')->size(2, 50);
    $s->optional('last_name', 'trim')->size(2, 50);
    $s->required('password')
        ->size(6, 32)
        ->equal_to('password_confirm');
    $s->optional('is_admin');
    $s->optional('is_activated');

    if ($s->has_error) {
        for my $field (@{$s->failed}) {
            my $err_msg;
            my ($check, $result, @args) = @{$s->error($field)};

            if ($check eq 'size') {
                $err_msg = "Длина должна быть от $args[0] до $args[1] символов";
            } elsif ($check eq 'like') {
                $err_msg = 'Поле содержит недопустимые символы';
            } elsif ($check eq 'equal_to') {
                $err_msg = 'Пароли не совпадают';
            } elsif ($check eq 'check_user_exists') {
                $err_msg = 'Пользователь с таким e-mail уже существует';
            }

            push @{$errors->{$field}}, $err_msg;
        }
    }

    return $errors;
}

1;
