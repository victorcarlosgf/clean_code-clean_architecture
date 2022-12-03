import IRepositoryFactory from "../../../domain/repository/repository-factory.interface";
import ICustomerRepository from "../../../domain/repository/customer.interface.rep";
import IProductRepository from "../../../domain/repository/product.interface.rep";
import IOrderRepository from "../../../domain/repository/order.interface.rep";
import CustomerRepository from "./customer.rep";
import ProductRepository from "./product.rep";
import OrderRepository from "./order.rep";

export default class DBRepositoryFactory implements IRepositoryFactory {

  constructor() { }

  createCustomerRepository(): CustomerRepository {
    return new CustomerRepository();
  }

  createProductRepository(): ProductRepository {
    return new ProductRepository();
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepository();
  }

}