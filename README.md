# mojo_base

A set of basic components for developing typical web projects based on the Mojolicious framework.

The goal of this project is to have at your fingertips a software solution for rapid deployment and further development of a typical web-project based on the Perl/Mojo stack, with a minimum number of dependencies.

WARNING! At the moment the project is in deep development.

In future versions it is planned to implement the functionality for: admin part, content pages, news feed, image galleries (with minimalistic crop), accounts management, statistics and outer api.

## Features

* Adaptive for deployment with Docker and natively (without Docker)
* Global replace JSON-parser (using JSON::XS)
* Global replace request headers parser (using HTTP::Headers::XS)
* Natively configs with separate dev/prod versions
* Base elegant models with using SQLite (and simple adaptive to the other RDBMS)
* Built in loggers
* Built in internationalization and localization
* Built in migrations system
* Built in management script
* Built in blank script with app context
* Build in gzipped body response

## Used software

Server side:
* Mojolicious==8.17
* JSON::XS==4.02
* Time::Moment==0.44
* DBI==1.642
* DBD::SQLite==1.62
* Geo::IP2Location::Lite==0.11

Client side:
* Bootstrap-native v2.0.27
* Fontawesome v5.8.2
* Mithrill.js v2.0.3

## Install

```shell
$ git clone git@github.com:ChaoticEvil/mojo_base.git
$ cd mojo_base
$ sudo cpan install Carton
$ carton install
```

## Usage

- `make run-dev` - start development web server (morbo)
- `make run-prod` - start production web server (hypnotoad)
- `make create-user` - add new regular user
- `make create-superuser` - add new admin user
- `make init-db` - initiate database and create migrations table
- `make show-migrations` - show all applied sql migrations
- `make upgrade-db` - find and aplly all new sql migrations
- `make downgrade-db` - revert last applied sql migration
