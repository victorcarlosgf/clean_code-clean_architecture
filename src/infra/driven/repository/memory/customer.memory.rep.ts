import ICustomerRepository from "../../../../domain/repository/customer.interface.rep";
import Customer from "../../../../domain/entities/customer.entity";

export default class CustomerMemoryRepository implements ICustomerRepository {
  private customers: Customer[];

  constructor() {
    this.customers = [];
  }

  async save(customer: Customer): Promise<any> {
    this.customers.push(customer);
    return this.customers;
  }

  async findByDocument(customerDocument: string): Promise<any> {
    const customer = this.customers.find(customer => customer.document === customerDocument);
    if (!customer)
      throw new Error("Customer not found");
    return customer;
  }
}