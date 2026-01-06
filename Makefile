.PHONY: db db-stop dev setup

DOCKER_POSTGRES_IMAGE := postgres:18.1-alpine
DB_CONTAINER := crimson-slash-postgres
DB_NAME := crimson_slash_development
DB_USER := postgres
DB_PASSWORD := postgres
DB_PORT := 5432

db:
	@if [ -z "$$(docker ps -q -f name=$(DB_CONTAINER))" ]; then \
		if [ -n "$$(docker ps -aq -f name=$(DB_CONTAINER))" ]; then \
			echo "Starting existing PostgreSQL container..."; \
			docker start $(DB_CONTAINER); \
		else \
			echo "Creating and starting PostgreSQL container..."; \
			docker run -d \
				--name $(DB_CONTAINER) \
				-e POSTGRES_USER=$(DB_USER) \
				-e POSTGRES_PASSWORD=$(DB_PASSWORD) \
				-e POSTGRES_DB=$(DB_NAME) \
				-p $(DB_PORT):5432 \
				$(DOCKER_POSTGRES_IMAGE); \
		fi; \
		echo "Waiting for PostgreSQL to be ready..."; \
		sleep 2; \
	else \
		echo "PostgreSQL container is already running."; \
	fi

db-stop:
	@if [ -n "$$(docker ps -q -f name=$(DB_CONTAINER))" ]; then \
		echo "Stopping PostgreSQL container..."; \
		docker stop $(DB_CONTAINER); \
	else \
		echo "PostgreSQL container is not running."; \
	fi

setup: db
	DATABASE_USERNAME=$(DB_USER) DATABASE_PASSWORD=$(DB_PASSWORD) bin/setup --skip-server

dev: db
	DATABASE_USERNAME=$(DB_USER) DATABASE_PASSWORD=$(DB_PASSWORD) bin/dev

