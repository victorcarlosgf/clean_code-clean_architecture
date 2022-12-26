
import IRepositoryFactory from "../../../../domain/repository/repository-factory.interface";
import IOrderRepository from "../../../../domain/repository/order.interface.rep";
import OrderDBRepository from "./model/order.db.rep";

export default class DBRepositoryFactory implements IRepositoryFactory {

  constructor() { }

  createOrderRepository(): IOrderRepository {
    return new OrderDBRepository();
  }
}