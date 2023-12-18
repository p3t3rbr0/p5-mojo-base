name  = mojo-base
exec  = docker exec -t $(name)
image = $(name):latest

.PHONY: all
.SILENT: all

#
# Docker commands
#
build-image:
	docker build -t $(image) .

rebuild-image:
	docker build --no-cache -t $(image) .

stop-container:
	docker stop $(name) || true

start-container:
	docker start $(name)

restart-container:
	make stop-container && make start-container

rm-container:
	docker rm $(name) || true

run-container:
	make rm-container \
	&& docker run -v $$(pwd):/$(name) -p 5000:5000 --restart=always --name="$(name)" -t $(image)

run-container-detached:
	make rm-container \
	&& docker run -d -v $$(pwd):/$(name) -p 5000:5000 --restart=always --name="$(name)" -t $(image)

#
# App commands
#
run-dev:
	morbo -w lib/ -w tmpl/ -w conf/ -v -l 'http://0.0.0.0:5000' ./script/app -m development

run-prod:
	hypnotoad script/app

create-user:
	perl script/manage.pl --create-user=0

create-superuser:
	./script/manage.pl --create-user=1

init-db:
	./script/manage.pl --init-db

show-migrations:
	./script/manage.pl --show-migrations

upgrade-db:
	./script/manage.pl --upgrade-db

downgrade-db:
	./script/manage.pl --downgrade-db=1

# Dockered app commands
create-user-d:
	$(exec) make create-user

create-superuser-d:
	$(exec) make create-superuser

init-db-d:
	$(exec) make init-db

show-migrations-d:
	$(exec) make show-migrations

upgrade-db-d:
	$(exec) make upgrade-db

downgrade-db-d:
	$(exec) make downgrade-db

build-static:
	cd static/admin \
		&& yarn \
        && yarn build

collect-static:
	cp static/admin/dist/index.html tmpl/admin/index.html.ep \
		&& sed -i.bak 's/style.css/\/admin\/dist\/style.css/g' tmpl/admin/index.html.ep \
		&& sed -i.bak 's/admin.js/\/admin\/dist\/admin.js/g' tmpl/admin/index.html.ep
