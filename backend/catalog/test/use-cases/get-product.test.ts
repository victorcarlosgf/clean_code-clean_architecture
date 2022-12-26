import { GetProductInput } from "../../src/application/use-cases/product/get-product/get-product.dto";
import GetProduct from "../../src/application/use-cases/product/get-product/get-product.usecase";
import Product from "../../src/domain/entities/product.entity";
import IProductRepository from "../../src/domain/repository/product.interface.rep";

const getProductInput: GetProductInput = {
  name: 'mug'
};

const product = new Product('1', 'mug', 'mug batman', { width: 100, height: 30, length: 10 }, 3, 3);

const productRepository: IProductRepository = {
  save: jest.fn().mockResolvedValue(null),
  findByName: jest.fn().mockResolvedValue(product),
  findAll: jest.fn(),
}

beforeAll(() => {
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('GetProduct', () => {

  test('Deve buscar um produto', async () => {
    const getProduct = new GetProduct(productRepository);
    const response = await getProduct.execute(getProductInput);
    expect(response).toEqual(product);
  });
})
