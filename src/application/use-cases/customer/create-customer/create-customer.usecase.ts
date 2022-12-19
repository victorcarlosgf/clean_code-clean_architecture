import ICreateCustomer from "./create-customer.interface";
import ICustomerRepository from "../../../../domain/repository/customer.interface.rep";
import Customer from "../../../../domain/entities/customer.entity";
import { CreateCustomerInput } from "./create-customer.dto";

export default class CreateCustomer implements ICreateCustomer {

  constructor(readonly customerRepository: ICustomerRepository) { }

  async execute(customerInput: CreateCustomerInput): Promise<any> {
    const customer = new Customer(
      customerInput.name,
      customerInput.document,
      customerInput.email);
    const customerSaved = await this.customerRepository.save(customer);

    return {
      data: customerSaved,
      status: 201
    };
  }
}