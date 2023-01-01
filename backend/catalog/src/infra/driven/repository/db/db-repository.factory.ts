
import IRepositoryFactory from '../../../../domain/repository/repository-factory.interface';
import IProductRepository from '../../../../domain/repository/product.interface.rep';
import ProductDBRepository from './model/product.db.rep';

export default class DBRepositoryFactory implements IRepositoryFactory {

  createProductRepository(): IProductRepository {
    return new ProductDBRepository();
  }
}