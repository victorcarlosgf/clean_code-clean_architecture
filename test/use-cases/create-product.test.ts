import { CreateProductDimensionInput, CreateProductInput } from "../../src/application/use-cases/product/create-product/create-product.dto";
import CreateProduct from "../../src/application/use-cases/product/create-product/create-product.usecase";
import ProductDBRepository from "../../src/infra/driven/repository/db/model/product.db.rep";

const createProductDimensionInput: CreateProductDimensionInput = {
  width: 1,
  height: 2,
  length: 1
};

let createProductInput: CreateProductInput = {
  name: "Tenis nike",
  description: "Tenis nike 39",
  dimension: createProductDimensionInput,
  weight: 3,
  value: 50,
  currency: 'USD'
};

describe('CreateProduct', () => {

  test('Deve criar produto', async () => {
    const productRepository = new ProductDBRepository();
    const createProduct = new CreateProduct(productRepository);
    const response = await createProduct.execute(createProductInput);
    expect(response.status).toBe(201);
  });
})
