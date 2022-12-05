import Order from "../entities/order.entity";

export default interface IOrderRepository {
  save(order: Order): Promise<any>;
}