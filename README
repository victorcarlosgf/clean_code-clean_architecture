# Clean Code e Clean Architecture

Projeto criado com o objetivo de aplicar os conhecimentos adquiridos no curso de Clean Code e Clean Architecture do [Rodrigo Branas](https://app.branas.io/public/products).

O contéudo do curso visa criar uma aplicação, dividida em vários microservices utilizando TypeScript com Clean Code, Refactoring, TDD, OO, Ports and Adapters, Clean Architecture, Domain-Driven Design, Design Patterns, SOLID, Event-Driven Architecture e CQRS.

## Clean Code

Conjunto de boas práticas que visam facilitar a escrita e leitura de um código.

## Clean Archictecture

Arquitetura Limpa (Clean Architecture) é um padrão arquitetural proposto por Robert Martin – mais conhecido como Uncle Bob – com o objetivo de promover a implementação de sistemas que favorecem reusabilidade de código, coesão, independência de tecnologia e testabilidade.
![Clean Architecture](https://github.com/victorcarlosgf/clean_code-clean_architecture/blob/main/resources/CleanArchitecture.jpg)

## Hexagonal architecture

Arquitetura Hexagonal, *classes de domínio não devem depender de classes relacionadas com infraestrutura, tecnologias ou sistemas externos*. A vantagem dessa divisão é desacoplar esses dois tipos de classes.
![Hexagonal architecture](https://github.com/victorcarlosgf/clean_code-clean_architecture/blob/main/resources/Arquitetura-Hexagonal-PECA-2-1-1024x721.png)

### Projeto (Cenário de aplicação)

Vamos implementar um sistema de vendas online com a possibilidade de realizar pedidos com múltiplos itens, 
cada um deles com uma quantidade variável, calculando o frete, os impostos, aplicando um cupom de desconto 
e ainda interagindo com o estoque. Além disso teremos ainda fluxos de pagamento e cancelamento do pedido realizado.

#### Tecnologias utilizadas
* Docker
* NodeJs
* Typescript
* Express
* Prisma
* RabbitMq
* Jest
* React

#### Configuração do Projeto
```
npm init -y
npm install typescript jest @types/jest ts-node ts-jest
npm i typescript -D (instalar como devDependencies)
npx tsc --init (cria arquivo tsconfig.json)
npx ts-jest config:init
```

#### Configurar banco de dados
```
npm i -D prisma
npx prisma init --datasource-provider SQLite
npx prisma migrate dev
npx prisma studio
npm i @prisma/client
```

#### Executar projeto com Docker
`make compose`

#### Executar projeto com Docker
`npm run dev`

####Rodar testes
`npm run test`