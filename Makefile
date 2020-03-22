# create postgres in docker locally
docker-postgres-run:
	docker run \
		--name design-db-dev \
		-p 127.0.0.1:5700:5432/tcp \
		-e POSTGRES_DB=design_portfolio \
		-e POSTGRES_USER=design_user \
		-v design-db-dev:/var/lib/postgresql/data \
		-d \
		postgres:12.1-alpine;

# start docker in postgres locally
docker-postgres-start:
	docker start design-db-dev

# connect to local postgres
psql:
	psql design_portfolio -U design_user -p 5700 -h localhost

# testing commands
test:
	 docker-compose exec -T cli yarn test
lint:
	 docker-compose exec -T cli yarn run lint
spellcheck:
	 docker-compose exec -T cli yarn run spellcheck
migrate:
	 docker-compose exec -T cli yarn run migrate

# check everything before commit
docker-prepublish: docker-lint docker-spellcheck docker-test

# start docker for dev env
docker-up:
	docker-compose down
	docker-compose  up --build

