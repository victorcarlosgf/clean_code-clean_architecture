import Product from "../../../domain/entities/product.entity";

export default interface ICatalogGateway {
  getProduct(nameProduct: string): Promise<Product>
}