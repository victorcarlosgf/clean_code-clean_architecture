import ICreateProduct from "./create-product.gateway";
import { createProductInput } from "./create-product.dto";
import Product from "../../../entities/product.entity";
import ProductRepository from "../../../infra/repository/product.rep";

export default class CreateProduct implements ICreateProduct {

  constructor(
    readonly db: ProductRepository
  ) { }

  async execute(productInput: createProductInput) {
    const product = new Product(productInput.description, productInput.value);

    const productSaved = await this.db.save(product);

    return {
      data: productSaved,
      status: 201
    };
  }
}