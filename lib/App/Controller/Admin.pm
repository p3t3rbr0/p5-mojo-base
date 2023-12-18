package App::Controller::Admin;

use Mojo::Base 'Mojolicious::Controller';

use utf8;
use strict;
use warnings;

# sub admin_index {
#     my $s = shift;
#     # $s->get_ip_info('185.46.16.244');
#     $s->model('Statistic')->inc('visit');
#     return $s->render(template => 'admin/index');
#     # if ($s->session->{is_auth} && $s->session->{is_admin}) {
#     #     return $s->render(template => 'index');
#     # } else {
#     #     return $s->redirect_to('admin_login');
#     # }
# }

sub show_index { $_[0]->render(template => 'admin/index') }


1;

__END__
