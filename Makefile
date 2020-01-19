# create postgres in docker locally
db-run:
	docker run \
		--name design-db-dev \
		-p 127.0.0.1:5600:5432/tcp \
		-e POSTGRES_DB=design_portfolio \
		-e POSTGRES_USER=design_user \
		-v design-db-dev:/var/lib/postgresql/data \
		-d \
		postgres:11.6-alpine;

# start docker in postgres locally
docker-postgres-start:
	docker start design-db-dev
# connect to local postgres
psql:
	psql design_portfolio -U design_user -p 5600 -h localhost

# testing commands
test:
	 docker-compose exec -T cli npm test
lint:
	 docker-compose exec -T cli npm run lint
spellcheck:
	 docker-compose exec -T cli npm run spellcheck
migrate:
	 docker-compose exec -T npm run migrate

# check everything before commit
docker-prepublish: docker-lint docker-spellcheck docker-test

# start docker for dev env
docker-up:
	docker-compose down
	docker-compose  up --build

