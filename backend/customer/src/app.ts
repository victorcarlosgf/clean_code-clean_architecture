import ExpressAdapter from './infra/driver/api/express.adapter';

import HealthcheckController from './adapters/controllers/healthcheck.ctrl';
import CustomerController from './adapters/controllers/customer.ctrl';

import CreateCustomer from './application/use-cases/customer/create-customer/create-customer.usecase';

// import DBRepositoryFactory from './infra/driven/repository/db/db-repository.factory';
// import MemoryRepositoryFactory from './infra/driven/repository/memory/memory-repository.factory';
import CustomerDBRepository from './infra/driven/repository/db/model/customer.db.rep';

const httpServer = new ExpressAdapter();

//const repositoryFactory = new DBRepositoryFactory();
// const repositoryFactory = new MemoryRepositoryFactory();

const customerRepository = new CustomerDBRepository();

const createClient = new CreateCustomer(customerRepository);

new HealthcheckController(httpServer);
new CustomerController(httpServer, createClient);

httpServer.listen(80);


