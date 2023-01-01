import IGetProducts from './get-products.interface';
import { GetProductsOutput } from './get-products.dto';
import IProductRepository from '../../../../domain/repository/product.interface.rep';

export default class GetProducts implements IGetProducts {
  constructor(readonly productRepository: IProductRepository) { }

  async execute(): Promise<GetProductsOutput> {
    const products = await this.productRepository
      .findAll();

    return products;
  }
}