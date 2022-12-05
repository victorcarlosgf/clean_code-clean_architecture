import IOrderRepository from "../../../../domain/repository/order.interface.rep";
import Order from "../../../../domain/entities/order.entity";

export default class OrderMemoryRepository implements IOrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  async save(order: Order): Promise<any> {
    this.orders.push(order);
    return this.orders;
  }
}