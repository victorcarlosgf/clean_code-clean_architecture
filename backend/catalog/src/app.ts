import ExpressAdapter from './infra/driver/api/express.adapter';

import HealthcheckController from './adapters/controllers/healthcheck.ctrl';
import ProductController from './adapters/controllers/product.ctrl';

import CreateProduct from './application/use-cases/product/create-product/create-product.usecase';
import GetProduct from './application/use-cases/product/get-product/get-product.usecase';
import GetProducts from './application/use-cases/product/get-products/get-products.usecase';

// import DBRepositoryFactory from './infra/driven/repository/db/db-repository.factory';
// import MemoryRepositoryFactory from './infra/driven/repository/memory/memory-repository.factory';
import ProductDBRepository from './infra/driven/repository/db/model/product.db.rep';

const httpServer = new ExpressAdapter();

//const repositoryFactory = new DBRepositoryFactory();
// const repositoryFactory = new MemoryRepositoryFactory();

const productRepository = new ProductDBRepository();

const createProduct = new CreateProduct(productRepository);
const getProduct = new GetProduct(productRepository);
const getProducts = new GetProducts(productRepository);

new HealthcheckController(httpServer);
new ProductController(httpServer, createProduct, getProduct, getProducts);

httpServer.listen(80);


