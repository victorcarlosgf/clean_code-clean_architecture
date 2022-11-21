import ExpressAdapter from './adapters/express.adapter';

import HealthcheckController from './controllers/healthcheck.ctrl';
import ClientController from './controllers/client.ctrl';
import ProductController from './controllers/product.ctrl';
import OrderController from './controllers/order.ctrl';

import CreateClient from './use-case/client/create-client/create-client';
import CreateProduct from './use-case/product/create-product/create-product';
import CreateOrder from './use-case/order/create-order/create-order';

import ClientRepository from './infra/repository/client.rep';
import ProductRepository from './infra/repository/product.rep';
import OrderRepository from './infra/repository/order.rep';

const httpServer = new ExpressAdapter()

const clientRepository = new ClientRepository();
const productRepository = new ProductRepository();
const orderRepository = new OrderRepository

const createClient = new CreateClient(clientRepository);
const createProduct = new CreateProduct(productRepository);
const createOrder = new CreateOrder(clientRepository, productRepository, orderRepository);

new HealthcheckController(httpServer);
new ClientController(httpServer, createClient);
new ProductController(httpServer, createProduct);
new OrderController(httpServer, createOrder);

httpServer.listen(3000);


