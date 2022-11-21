import Product from "../src/entities/product.entity";
import CreateProduct from "../src/use-case/product/create-product/create-product";

test('Deve criar produto', async () => {
  const productInput = {
    description: 'Tenis adidas',
    value: 30,
  };

  const product = new Product(productInput.description, productInput.value);

  const createProduct = new CreateProduct();
  const response = await createProduct.execute(productInput);
  expect(response.data).toStrictEqual(product);
  expect(response.status).toBe(201);
});