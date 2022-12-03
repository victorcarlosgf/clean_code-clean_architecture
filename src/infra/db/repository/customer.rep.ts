import ICustomerRepository from "../../../domain/repository/customer.interface.rep";
import Customer from "../../../domain/entities/customer.entity";
import PrismaAdapter from "../prisma.adapter";

export default class CustomerRepository implements ICustomerRepository {
  connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(customer: Customer): Promise<any> {
    return this.connection.prisma.customer.create({
      data: {
        name: customer.name,
        document: customer.document
      }
    })
  }

  async findUnique(customerId: string): Promise<any> {
    return this.connection.prisma.customer.findUnique(
      {
        where: {
          id: customerId
        }
      }
    )
  }
}