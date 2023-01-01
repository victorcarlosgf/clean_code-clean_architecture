import Product from '../entities/product.entity';

export default interface IProductRepository {
  save(product: Product): Promise<any>;
  findByName(productName: string): Promise<Product>;
  findAll(): Promise<Product[]>;
}