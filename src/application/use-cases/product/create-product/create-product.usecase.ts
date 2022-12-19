import ICreateProduct from "./create-product.interface";
import { CreateProductInput } from "./create-product.dto";
import Product from "../../../../domain/entities/product.entity";
import IProductRepository from "../../../../domain/repository/product.interface.rep";

export default class CreateProduct implements ICreateProduct {
  constructor(readonly productRepository: IProductRepository) { }

  async execute(productInput: CreateProductInput) {
    const product = new Product(
      productInput.name,
      productInput.description,
      productInput.dimension,
      productInput.weight,
      productInput.value
    );

    const productSaved = await this.productRepository
      .save(product);

    return {
      data: productSaved,
      status: 201
    };
  }
}