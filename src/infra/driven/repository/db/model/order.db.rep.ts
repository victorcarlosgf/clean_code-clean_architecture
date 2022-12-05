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
        items: order.orderItems
      }
    })
  }
}