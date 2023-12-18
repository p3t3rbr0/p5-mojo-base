FROM alpine:3.10.2
MAINTAINER Peter Brovchenko <dr.brduch@protonmail.com>

WORKDIR /mojo-base
COPY cpanfile ./

RUN apk add --update --no-cache build-base gcc make perl perl-dev perl-utils perl-app-cpanminus sqlite \
    && cpanm --installdeps --notest --no-wget --no-lwp . \
    && rm -r /root/.cpanm

COPY . .
EXPOSE 5000
CMD ["./entry.sh"]