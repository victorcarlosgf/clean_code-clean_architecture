import { CreateCustomerInput, CreateCustomerOutput } from "./create-customer.dto";

export default interface ICreateCustomer {
  execute(customerInput: CreateCustomerInput): Promise<CreateCustomerOutput>
}