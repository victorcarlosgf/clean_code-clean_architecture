import ICustomerRepository from "./customer.interface.rep";

export default interface IRepositoryFactory {
	createCustomerRepository(): ICustomerRepository;
}