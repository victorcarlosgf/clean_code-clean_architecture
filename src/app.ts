import ExpressAdapter from './infra/driver/api/express.adapter';

import HealthcheckController from './adapters/controllers/healthcheck.ctrl';
import CustomerController from './adapters/controllers/customer.ctrl';
import ProductController from './adapters/controllers/product.ctrl';
import OrderController from './adapters/controllers/order.ctrl';
import FreightController from './adapters/controllers/freight.ctrl';

import CreateCustomer from './application/use-cases/customer/create-customer/create-customer.usecase';
import CreateProduct from './application/use-cases/product/create-product/create-product.usecase';
import CreateOrder from './application/use-cases/order/create-order/create-order.usecase';
import GetOrder from './application/use-cases/order/get-order/get-order.usecase';
import SimulateFreight from './application/use-cases/simulate-freight/simulate-freight.usecase';

// import DBRepositoryFactory from './infra/driven/repository/db/db-repository.factory';
// import MemoryRepositoryFactory from './infra/driven/repository/memory/memory-repository.factory';
import CustomerDBRepository from './infra/driven/repository/db/model/customer.db.rep';
import ProductDBRepository from './infra/driven/repository/db/model/product.db.rep';
import OrderDBRepository from './infra/driven/repository/db/model/order.db.rep';

const httpServer = new ExpressAdapter();

//const repositoryFactory = new DBRepositoryFactory();
// const repositoryFactory = new MemoryRepositoryFactory();

const customerRepository = new CustomerDBRepository();
const productRepository = new ProductDBRepository();
const orderRepository = new OrderDBRepository();

const createClient = new CreateCustomer(customerRepository);
const createProduct = new CreateProduct(productRepository);
const createOrder = new CreateOrder(customerRepository, productRepository, orderRepository);
const getOrder = new GetOrder(orderRepository);
const simulateFreight = new SimulateFreight(productRepository);

new HealthcheckController(httpServer);
new CustomerController(httpServer, createClient);
new ProductController(httpServer, createProduct);
new OrderController(httpServer, createOrder, getOrder);
new FreightController(httpServer, simulateFreight);

httpServer.listen(3000);


