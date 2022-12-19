import Order from "../entities/order.entity";

export default interface IOrderRepository {
  save(order: Order): Promise<any>;
  findByCode(orderCode: string): Promise<any>
  findByDocument(customerDocument: string): Promise<any>;
}