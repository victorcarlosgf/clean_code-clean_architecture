import IGetProduct from "./get-product.interface";
import { GetProductInput, GetProductOutput } from "./get-product.dto";
import IProductRepository from "../../../../domain/repository/product.interface.rep";

export default class GetProduct implements IGetProduct {
  constructor(readonly productRepository: IProductRepository) { }

  async execute(getProductInput: GetProductInput): Promise<GetProductOutput> {
    const product = await this.productRepository
      .findByName(getProductInput.name);

    return product;
  }
}