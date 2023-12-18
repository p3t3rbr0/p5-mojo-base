package App::Controller::Admin::Api::V1::User;

use Mojo::Base 'App::Controller::Base';

use App::Validator::User;

has M => sub { $_[0]->model('User');      };
has V => sub { App::Validator::User->new; };

sub get_details {
    my $s = shift;

    my $fields = [qw/id avatar username email created is_activated is_admin/];

    my $user_details = $s->M->get($fields, id => $s->param('id'))
        or return $s->render_text($s->i18n('errors.users.user_not_found'), status => 404);

    return $s->render_json($user_details);
}

sub get_list {
    my $s = shift;

    $s->V->input($s->req->params->to_hash);
    $s->V->optional('search_term', 'trim')->size(2, 50);

    my $params = $s->V->output;

    return $s->render_json($s->M->list(search_term => $params->{search_term}));
}

sub create {
    my $s = shift;

    my $errors = $s->V->validate_creation_data($s->req->params->to_hash);

    return $s->render_json({errors => $errors}, status => 400)
        if %$errors;

    use Data::Dumper;
    warn "VALID_DATA: " . Dumper $s->V->output;

    my $created_rows = $s->M->create($s->V->output)
        or return $s->render(text => $s->i18n('errors.server_error'), status => 500);

    return $s->render_json({created_rows => $created_rows}, status => 201);
}

sub edit {
    my $s = shift;

    # TODO: провалидировать данные для создания пользователя

    return $s->render(status => 200);
}

1;

__END__

=encoding UTF-8

=head1 NAME

App::Controller::Admin::Api::V1::User

=cut
