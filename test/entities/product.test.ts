import Product from "../../src/domain/entities/product.entity";

test("Deve criar um produto", function () {
  const product = new Product('mug', 'mug batman', { width: 1, height: 2, length: 1 }, 1, 3);
  expect(product).toBeInstanceOf(Product);
});