import ICreateCustomer from "./create-customer.interface";
import { CreateCustomerInput } from "./create-customer.dto";
import IRepositoryFactory from "../../../../domain/repository/repository-factory.interface";
import ICustomerRepository from "../../../../domain/repository/customer.interface.rep";
import Customer from "../../../../domain/entities/customer.entity";

export default class CreateCustomer implements ICreateCustomer {
  private customerRepository: ICustomerRepository;

  constructor(
    repositoryFactory: IRepositoryFactory
  ) {
    this.customerRepository = repositoryFactory.createCustomerRepository();
  }

  async execute(customerInput: CreateCustomerInput): Promise<any> {
    const customer = new Customer(customerInput.name, customerInput.document);
    const customerSaved = await this.customerRepository.save(customer);

    return {
      data: customerSaved,
      status: 201
    };
  }
}