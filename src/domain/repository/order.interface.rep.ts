import OrderItem from "../entities/order-item.entity";

export default interface IOrderRepository {
  save(customerId: string, items: OrderItem[]): Promise<any>;
}