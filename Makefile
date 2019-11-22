all: compose-setup

prepare:
	touch .bash_history
	touch .env

compose:
	docker-compose up

compose-install:
	docker-compose run web npm install

compose-setup: prepare compose-build compose-install compose-db-setup

docker-migrate:
	docker-compose run server:latest typeorm migration:run

docker-bash:
	docker-compose run server:latest bash

docker-lint:
	docker-compose run server:latest npx eslint .

docker-check-types:
	docker-compose run server:latest npx tsc

docker-db-run:
	docker run \
		--name design-db-dev \
		-p 127.0.0.1:5600:5432/tcp \
		-e POSTGRES_DB=design \
		-e POSTGRES_USER=design \
		-v design-db-dev:/var/lib/postgresql/data \
		-d \
		postgres:11.5-alpine;

docker-db-drop:
	docker rm -f design-db-dev && \
		docker volume rm design-db-dev
psql:
	psql design -U design -p 5600 -h localhost

build:
	docker build --tag server:latest .

check:
	docker run --rm server:latest yarn audit && make lint && make spellcheck

compose-publish: build
	docker-compose run server npm publish

test:
	npm test

lint:
	npx eslint .

type-check:
	npx tsc

migrate:
	npx typeorm migration:run

default:
	exit 0

.PHONY: test
