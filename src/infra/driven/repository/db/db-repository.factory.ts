
import IRepositoryFactory from "../../../../domain/repository/repository-factory.interface";
import ICustomerRepository from "../../../../domain/repository/customer.interface.rep";
import IProductRepository from "../../../../domain/repository/product.interface.rep";
import IOrderRepository from "../../../../domain/repository/order.interface.rep";
import CustomerDBRepository from "./model/customer.db.rep";
import ProductDBRepository from "./model/product.db.rep";
import OrderDBRepository from "./model/order.db.rep";

export default class DBRepositoryFactory implements IRepositoryFactory {

  constructor() { }

  createCustomerRepository(): ICustomerRepository {
    return new CustomerDBRepository();
  }

  createProductRepository(): IProductRepository {
    return new ProductDBRepository();
  }

  createOrderRepository(): IOrderRepository {
    return new OrderDBRepository();
  }
}