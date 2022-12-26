import { CreateProductDimensionInput, CreateProductInput } from "../../src/application/use-cases/product/create-product/create-product.dto";
import CreateProduct from "../../src/application/use-cases/product/create-product/create-product.usecase";
import IProductRepository from "../../src/domain/repository/product.interface.rep";

const createProductDimensionInput: CreateProductDimensionInput = {
  width: 1,
  height: 2,
  length: 1
};

const createProductInput: CreateProductInput = {
  name: "Tenis nike",
  description: "Tenis nike 39",
  dimension: createProductDimensionInput,
  weight: 3,
  value: 50,
  currency: 'USD'
};

const productRepository: IProductRepository = {
  save: jest.fn().mockResolvedValue(null),
  findByName: jest.fn(),
  findAll: jest.fn(),
}

beforeAll(() => {
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('CreateProduct', () => {

  test('Deve criar produto', async () => {
    const createProduct = new CreateProduct(productRepository);
    const response = await createProduct.execute(createProductInput);
    expect(response.status).toBe(201);
  });
})
