import Product from "../entities/product.entity";

export default interface IProductRepository {
  save(product: Product): Promise<any>;
  findUnique(productId: string): Promise<any>;
}