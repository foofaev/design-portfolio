db-run:
	docker run \
		--name design-db-dev \
		-p 127.0.0.1:5600:5432/tcp \
		-e POSTGRES_DB=design_portfolio \
		-e POSTGRES_USER=design_user \
		-v design-db-dev:/var/lib/postgresql/data \
		-d \
		postgres:11.6-alpine;
docker-test:
	 docker-compose exec -T cli npm test
docker-lint:
	 docker-compose exec -T cli npm run lint
docker-spellcheck:
	 docker-compose exec -T cli npm run spellcheck
docker-up:
	docker-compose down
	docker-compose  up --build
docker-prepublish: docker-lint docker-spellcheck docker-test
