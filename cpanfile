requires 'Mojolicious',            '==8.68';
requires 'JSON::XS',               '==4.03';
requires 'Time::Moment',           '==0.44';
requires 'DBI',                    '==1.643';
requires 'DBD::SQLite',            '==1.66';
requires 'Geo::IP2Location::Lite', '==0.13';
requires 'IO::Compress::Gzip',     '==2.096';

on 'test' => sub {
    requires 'Devel::Cover';
    requires 'Test::PerlTidy';
    requires 'Test::Perl::Critic';
};
