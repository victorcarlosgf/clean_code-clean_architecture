import CreateProduct from "../../src/application/use-case/product/create-product/create-product.usecase";
import DBRepositoryFactory from "../../src/infra/db/repository/repository-factory";

const productInput: any = {
  name: "Tenis nike",
  description: "Tenis nike 39",
  volume: 20,
  density: 3,
  value: 50
};

describe('CreateProduct', () => {
  test('Deve criar produto', async () => {
    const repositoryFactory = new DBRepositoryFactory();
    const createProduct = new CreateProduct(repositoryFactory);
    const response = await createProduct.execute(productInput);
    expect(response.status).toBe(201);
  });

  test('Não deve criar produto sem descrição', async () => {
    delete productInput.description;
    const repositoryFactory = new DBRepositoryFactory()
    const createProduct = new CreateProduct(repositoryFactory);
    expect(() => createProduct.execute(productInput))
      .rejects
      .toThrow(new Error('Undefined description'));
  });
})
