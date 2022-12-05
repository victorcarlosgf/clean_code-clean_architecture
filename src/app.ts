import ExpressAdapter from './infra/driver/api/express.adapter';

import HealthcheckController from './adapters/controllers/healthcheck.ctrl';
import CustomerController from './adapters/controllers/customer.ctrl';
import ProductController from './adapters/controllers/product.ctrl';
import OrderController from './adapters/controllers/order.ctrl';

import CreateCustomer from './application/use-case/customer/create-customer/create-customer.usecase';
import CreateProduct from './application/use-case/product/create-product/create-product.usecase';
import CreateOrder from './application/use-case/order/create-order/create-order.usecase';
import DBRepositoryFactory from './infra/driven/repository/db/db-repository.factory';
import MemoryRepositoryFactory from './infra/driven/repository/memory/memory-repository.factory';

const httpServer = new ExpressAdapter();

const repositoryFactory = new DBRepositoryFactory();
// const repositoryFactory = new MemoryRepositoryFactory();

const createClient = new CreateCustomer(repositoryFactory);
const createProduct = new CreateProduct(repositoryFactory);
const createOrder = new CreateOrder(repositoryFactory);

new HealthcheckController(httpServer);
new CustomerController(httpServer, createClient);
new ProductController(httpServer, createProduct);
new OrderController(httpServer, createOrder);

httpServer.listen(3000);


