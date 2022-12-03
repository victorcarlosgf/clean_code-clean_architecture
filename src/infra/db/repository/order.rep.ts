import OrderItem from "../../../domain/entities/order-item.entity";
import IOrderRepository from "../../../domain/repository/order.interface.rep";
import PrismaAdapter from "../prisma.adapter";

export default class OrderRepository implements IOrderRepository {
  connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(customerId: string, items: OrderItem[]): Promise<any> {
    return this.connection.prisma.order.create({
      data: {
        customerId,
        items
      }
    })
  }
}