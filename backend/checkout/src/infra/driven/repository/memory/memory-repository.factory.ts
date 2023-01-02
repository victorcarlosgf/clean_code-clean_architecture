
import IRepositoryFactory from '../../../../domain/repository/repository-factory.interface';
import IOrderRepository from '../../../../domain/repository/order.interface.rep';
import OrderMemoryRepository from './order.memory.rep';

export default class MemoryRepositoryFactory implements IRepositoryFactory {
  orderRepository?: IOrderRepository;

  createOrderRepository(): IOrderRepository {
    if (!this.orderRepository) {
      return new OrderMemoryRepository();
    }
    return this.orderRepository;
  }
}