import IProductRepository from '../../../../domain/repository/product.interface.rep';
import Product from '../../../../domain/entities/product.entity';

export default class ProductMemoryRepository implements IProductRepository {
  private products: Product[];

  constructor() {
    this.products = [];
  }

  async save(product: Product): Promise<any> {
    this.products.push(product);
    return this.products;
  }

  async findByName(productName: string): Promise<any> {
    const product = this.products.find(product => product.name === productName);
    if (!product)
      throw new Error('Product not found');
    return product;
  }

  async findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }
}