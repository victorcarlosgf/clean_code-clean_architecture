.PHONY: build up down start stop restart logs login setup test

DOCKER_USERNAME ?= victor
IMAGE_NAME ?= dockernode
APPLICATION_NAME ?= customer

build:
	docker-compose build

up:
	docker-compose up -d

watch:
	WATCH_FILES=1 docker-compose up -d

down:
	docker-compose down

start:
	docker-compose start

stop:
	docker-compose stop

restart: down up

logs:
	docker-compose logs --tail=100 -f

login:
	docker-compose run --rm -w /app ${APPLICATION_NAME} /bin/bash

setup:
	docker-compose run --rm -w /app ${APPLICATION_NAME} /bin/bash -c "npm run setup"

migrate:
	docker-compose run --rm -w /app ${APPLICATION_NAME} /bin/bash -c "npx prisma migrate dev --name init"

test:
	docker-compose run --rm -w /app ${APPLICATION_NAME} /bin/bash -c "npm run test"