import Customer from "../../../domain/entities/customer.entity";

export default interface ICustomerGateway {
  getCustomer(customerDocument: string): Promise<Customer>
}