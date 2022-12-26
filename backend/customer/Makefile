DOCKER_USERNAME ?= victor
IMAGE_NAME ?= dockernode
APPLICATION_NAME ?= customer_customer_1

build:
	docker build -t ${DOCKER_USERNAME}/${IMAGE_NAME} .

up:
	docker run -p 3000:80 -d --name ${APPLICATION_NAME} ${DOCKER_USERNAME}/${IMAGE_NAME}

stop:
	docker stop ${APPLICATION_NAME}

start:
	docker start ${APPLICATION_NAME}

login:
	docker exec -it ${APPLICATION_NAME} sh

logs:
	docker logs ${APPLICATION_NAME}

compose:
	docker-compose up -d