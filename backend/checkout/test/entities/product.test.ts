import Product from "../../src/domain/entities/product.entity";

test("Deve instanciar entidade Produto", function () {
  const product = new Product('1', 'mug', 'mug batman', { width: 100, height: 30, length: 10 }, 3, 3);
  expect(product).toBeInstanceOf(Product);
});

test("Deve calcular o volume do produto", function () {
  const product = new Product('1', 'mug', 'mug batman', { width: 100, height: 30, length: 10 }, 3, 3);
  expect(product.getVolume()).toBe(0.03);
});

test("Deve calcular a densidade do produto", function () {
  const product = new Product('1', 'mug', 'mug batman', { width: 100, height: 30, length: 10 }, 3, 3);
  expect(product.getDensity()).toBe(100);
});