import IRepositoryFactory from "../../../../domain/repository/repository-factory.interface";
import ICustomerRepository from "../../../../domain/repository/customer.interface.rep";
import CustomerDBRepository from "./model/customer.db.rep";

export default class DBRepositoryFactory implements IRepositoryFactory {

  constructor() { }

  createCustomerRepository(): ICustomerRepository {
    return new CustomerDBRepository();
  }
}