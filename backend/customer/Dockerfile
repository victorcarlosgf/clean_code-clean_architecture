## Baixa a imagem do node com versão alpine (versão mais simplificada e leve)
FROM node:alpine

ENV PATH="/app/node_modules/.bin:${PATH}"

## Define o local onde o app vai ficar no disco do container
## Pode ser o diretório que você quiser
WORKDIR /app

## Copia tudo que começa com package e termina com .json para dentro da pasta /usr/app
COPY package*.json ./

RUN apk add git bash sudo mysql-client
## Executa npm install para adicionar as dependências e criar a pasta node_modules
RUN npm install
RUN node -v

## Copia tudo que está no diretório onde o arquivo Dockerfile está
## para dentro da pasta /usr/app do container
## Vamos ignorar a node_modules por isso criaremos um .dockerignore
COPY . .

## Container ficará ouvindo os acessos na porta 3000
EXPOSE 80

## Não se repete no Dockerfile
## Executa o comando npm start para iniciar o script que está no package.json
CMD npx prisma generate && npx husky install && npx husky add .husky/pre-commit "eslint --ext src --fix"