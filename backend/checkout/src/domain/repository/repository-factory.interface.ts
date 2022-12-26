import IOrderRepository from "./order.interface.rep";

export default interface IRepositoryFactory {
	createOrderRepository(): IOrderRepository;
}