import ICustomerRepository from "../../../../../domain/repository/customer.interface.rep";
import Customer from "../../../../../domain/entities/customer.entity";
import PrismaAdapter from "../prisma.adapter";

export default class CustomerDBRepository implements ICustomerRepository {
  connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(customer: Customer): Promise<any> {
    return this.connection.prisma.customer.create({
      data: {
        name: customer.name,
        document: customer.document,
        email: customer.email,
      }
    })
  }

  async findByDocument(customerDocument: string): Promise<any> {
    return this.connection.prisma.customer.findFirst(
      {
        where: {
          document: customerDocument
        },
        orderBy: {
          id: "desc"
        }
      }
    )
  }
}