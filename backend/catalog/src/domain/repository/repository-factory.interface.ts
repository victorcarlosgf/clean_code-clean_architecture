import IProductRepository from "./product.interface.rep";

export default interface IRepositoryFactory {
	createProductRepository(): IProductRepository;
}