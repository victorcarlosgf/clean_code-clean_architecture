
import IRepositoryFactory from "../../../../domain/repository/repository-factory.interface";
import ICustomerRepository from "../../../../domain/repository/customer.interface.rep";
import IProductRepository from "../../../../domain/repository/product.interface.rep";
import IOrderRepository from "../../../../domain/repository/order.interface.rep";
import CustomerMemoryRepository from "./customer.memory.rep";
import ProductMemoryRepository from "./product.memory.rep";
import OrderMemoryRepository from "./order.memory.rep";

export default class MemoryRepositoryFactory implements IRepositoryFactory {
  customerRepository?: ICustomerRepository
  productRepository?: IProductRepository;
  orderRepository?: IOrderRepository;

  constructor() { }

  createCustomerRepository(): ICustomerRepository {
    if (!this.customerRepository) {
      return new CustomerMemoryRepository();
    }
    return this.customerRepository;
  }

  createProductRepository(): IProductRepository {
    if (!this.productRepository) {
      return new ProductMemoryRepository();
    }
    return this.productRepository;
  }

  createOrderRepository(): IOrderRepository {
    if (!this.orderRepository) {
      return new OrderMemoryRepository();
    }
    return this.orderRepository;
  }
}