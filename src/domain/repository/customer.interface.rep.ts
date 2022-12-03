import Customer from "../entities/customer.entity";

export default interface ICustomerRepository {
  save(customer: Customer): Promise<any>;
  findUnique(customerId: string): Promise<any>;
}