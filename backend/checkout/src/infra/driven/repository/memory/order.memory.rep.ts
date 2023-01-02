import IOrderRepository from '../../../../domain/repository/order.interface.rep';
import Order from '../../../../domain/entities/order.entity';

export default class OrderMemoryRepository implements IOrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  async save(order: Order): Promise<any> {
    this.orders.push(order);
    return this.orders;
  }

  async findByCode(orderCode: string): Promise<any> {
    const order = this.orders.find(order => order.getCode() === orderCode);
    if (!order)
      throw new Error('Order not found');
    return order;
  }

  async findByDocument(customerDocument: string): Promise<any> {
    const order = this.orders.find(order => order.customer.document === customerDocument);
    if (!order)
      throw new Error('Order not found');
    return order;
  }
}