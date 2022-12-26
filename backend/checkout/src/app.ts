import ExpressAdapter from './infra/driver/api/express.adapter';

import HealthcheckController from './adapters/controllers/healthcheck.ctrl';
import OrderController from './adapters/controllers/order.ctrl';

import CreateOrder from './application/use-cases/order/create-order/create-order.usecase';
import GetOrder from './application/use-cases/order/get-order/get-order.usecase';

import CustomerApiGateway from './adapters/gateways/customer/customer-api.gateway';

// import DBRepositoryFactory from './infra/driven/repository/db/db-repository.factory';
// import MemoryRepositoryFactory from './infra/driven/repository/memory/memory-repository.factory';
import OrderDBRepository from './infra/driven/repository/db/model/order.db.rep';
import CatalogApiGateway from './adapters/gateways/catalog/catalog-api.gateway';
import FreightApiGateway from './adapters/gateways/freight/freight-api.gateway';

const httpServer = new ExpressAdapter();

//const repositoryFactory = new DBRepositoryFactory();
// const repositoryFactory = new MemoryRepositoryFactory();

const customerGateway = new CustomerApiGateway();
const catalogGateway = new CatalogApiGateway();
const freightGateway = new FreightApiGateway();

const orderRepository = new OrderDBRepository();


const createOrder = new CreateOrder(orderRepository, customerGateway, catalogGateway, freightGateway);
const getOrder = new GetOrder(orderRepository);

new HealthcheckController(httpServer);

new OrderController(httpServer, createOrder, getOrder);

httpServer.listen(80);


