import ICatalogGateway from "./catalog.gateway.interface";
import Product from "../../../domain/entities/product.entity";
import axios from "axios";

export default class CatalogApiGateway implements ICatalogGateway {

  async getProduct(nameProduct: string): Promise<Product> {
    const response = await axios.get(`http://localhost:3001/products/${nameProduct}`);
    const productData = response.data;
    return new Product(
      productData.id,
      productData.name,
      productData.description,
      {
        width: productData.dimension.width,
        height: productData.dimension.height,
        length: productData.dimension.length
      },
      productData.weight,
      productData.price,
      productData.currency
    );
  }
}