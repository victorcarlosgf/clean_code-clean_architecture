
import IRepositoryFactory from '../../../../domain/repository/repository-factory.interface';
import IProductRepository from '../../../../domain/repository/product.interface.rep';
import ProductMemoryRepository from './product.memory.rep';

export default class MemoryRepositoryFactory implements IRepositoryFactory {
  productRepository?: IProductRepository;

  createProductRepository(): IProductRepository {
    if (!this.productRepository) {
      return new ProductMemoryRepository();
    }
    return this.productRepository;
  }
}