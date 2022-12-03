import ICustomerRepository from "./customer.interface.rep";
import IOrderRepository from "./order.interface.rep";
import IProductRepository from "./product.interface.rep";


export default interface IRepositoryFactory {
	createCustomerRepository(): ICustomerRepository;
	createProductRepository(): IProductRepository;
	createOrderRepository(): IOrderRepository;
}