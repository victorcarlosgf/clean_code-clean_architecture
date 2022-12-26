import ExpressAdapter from './infra/driver/api/express.adapter';

import HealthcheckController from './adapters/controllers/healthcheck.ctrl';
import FreightController from './adapters/controllers/freight.ctrl';

import ZipcodeDBRepository from './infra/driven/repository/db/model/zipcode.db.rep';
import CalculateFreight from './application/use-cases/calculate-freight/calculate-freight.usecase';

// import DBRepositoryFactory from './infra/driven/repository/db/db-repository.factory';
// import MemoryRepositoryFactory from './infra/driven/repository/memory/memory-repository.factory';

const httpServer = new ExpressAdapter();

//const repositoryFactory = new DBRepositoryFactory();
// const repositoryFactory = new MemoryRepositoryFactory();

const zipcodeRepository = new ZipcodeDBRepository();

const calculateFreight = new CalculateFreight(zipcodeRepository);

new HealthcheckController(httpServer);
new FreightController(httpServer, calculateFreight);

httpServer.listen(80);


