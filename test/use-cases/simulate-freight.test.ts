import SimulateFreight from "../../src/application/use-cases/simulate-freight/simulate-freight.usecase";
import { SimulateFreightInput } from "../../src/application/use-cases/simulate-freight/simulate-freight.dto";
import IProductRepository from "../../src/domain/repository/product.interface.rep";

test("Deve simular o frete minimo", async function () {
  const productFound = {
    name: "Tenis nike",
    description: "Tenis nike 39",
    width: 1,
    height: 1,
    length: 1,
    weight: 1,
    value: 50,
    currency: 'USD'
  };

  const productRepository: IProductRepository = {
    async findByName() { return productFound },
    async save() { }
  }
  const simulateFreight = new SimulateFreight(productRepository);
  const input: SimulateFreightInput = {
    items: [
      { productName: 'Tenis nike', quantity: 1 }
    ]
  };
  const output = await simulateFreight.execute(input);
  expect(output.data.total).toBe(10);
});

test("Deve simular o frete para um pedido", async function () {
  const productFound = {
    name: "Tenis nike",
    description: "Tenis nike 39",
    width: 4,
    height: 3,
    length: 3,
    weight: 30,
    value: 50,
    currency: 'USD'
  };

  const productRepository: IProductRepository = {
    async findByName() { return productFound },
    async save() { }
  }
  const simulateFreight = new SimulateFreight(productRepository);
  const input: SimulateFreightInput = {
    items: [
      { productName: 'Tenis nike', quantity: 3 }
    ]
  };
  const output = await simulateFreight.execute(input);
  expect(output.data.total).toBe(900.0000000000002);
});