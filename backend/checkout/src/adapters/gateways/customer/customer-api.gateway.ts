import ICustomerGateway from "./customer.gateway.interface";
import Customer from "../../../domain/entities/customer.entity";
import axios from "axios";

export default class CustomerApiGateway implements ICustomerGateway {
  async getCustomer(customerName: string): Promise<Customer> {
    const response = await axios.get(`http://localhost:3000/customer/${customerName}`);
    const customerData = response.data;
    return new Customer(
      customerData.name,
      customerData.document,
      customerData.email,
      customerData.id,
      customerData.createdAt
    );
  }
}