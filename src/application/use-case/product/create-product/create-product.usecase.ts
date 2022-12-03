import ICreateProduct from "./create-product.interface";
import { CreateProductInput } from "./create-product.dto";
import Product from "../../../../domain/entities/product.entity";
import IProductRepository from "../../../../domain/repository/product.interface.rep";
import IRepositoryFactory from "../../../../domain/repository/repository-factory.interface";

export default class CreateProduct implements ICreateProduct {
  private productRepository: IProductRepository;
  constructor(
    repositoryFactory: IRepositoryFactory
  ) {
    this.productRepository = repositoryFactory.createProductRepository()
  }

  async execute(productInput: CreateProductInput) {
    const product = new Product(
      productInput.name,
      productInput.description,
      productInput.volume,
      productInput.density,
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