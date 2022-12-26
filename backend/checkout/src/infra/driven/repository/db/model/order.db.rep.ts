import IOrderRepository from "../../../../../domain/repository/order.interface.rep";
import PrismaAdapter from "../prisma.adapter";
import Order from "../../../../../domain/entities/order.entity";

export default class OrderDBRepository implements IOrderRepository {
  connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(order: Order): Promise<any> {
    return this.connection.prisma.order.create({
      data: {
        customerId: order.customer.id,
        code: order.generateCode(1),
        total: order.getTotal()
      }
    })
  }

  async findByCode(orderCode: string): Promise<any> {
    return this.connection.prisma.order.findFirst(
      {
        where: {
          code: orderCode
        },
        orderBy: {
          id: "desc"
        }
      }
    )
  }

  async findByDocument(customerDocument: string): Promise<any> {
    return this.connection.prisma.order.findMany(
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