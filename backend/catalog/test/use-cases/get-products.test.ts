import GetProducts from "../../src/application/use-cases/product/get-products/get-products.usecase";
import Product from "../../src/domain/entities/product.entity";
import IProductRepository from "../../src/domain/repository/product.interface.rep";

const product1 = new Product('1', 'mug', 'mug batman', { width: 100, height: 30, length: 10 }, 3, 3);
const product2 = new Product('1', 'mug', 'mug batman', { width: 100, height: 30, length: 10 }, 3, 3);

const products = [product1, product2]

const productRepository: IProductRepository = {
  save: jest.fn().mockResolvedValue(null),
  findByName: jest.fn(),
  findAll: jest.fn().mockResolvedValue(products),
}

beforeAll(() => {
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('GetProducts', () => {

  test('Deve buscar todos produtos', async () => {
    const getProducts = new GetProducts(productRepository);
    const response = await getProducts.execute();
    expect(response).toEqual(products);
  });
})
