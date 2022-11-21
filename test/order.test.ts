import Client from "../src/entities/client.entity";
import Product from "../src/entities/product.entity";
import Order from "../src/entities/order.entity";
import CreateOrder from "../src/use-case/order/create-order/create-order";

test('Deve criar pedido', async () => {
  const orderInput = {
    clientId: 1,
    products: [1, 2, 3],
  };

  const clientInput = {
    name: 'Victor Freitas',
    document: '36998272162',
  };

  const client = new Client(clientInput.name, clientInput.document);

  const productInput = {
    description: 'Tenis adidas',
    value: 30,
  };

  const product = new Product(productInput.description, productInput.value);

  const products = [];
  products.push(product)

  const order = new Order(client, products);
  const createOrder = new CreateOrder();
  const response = await createOrder.execute(orderInput);

  expect(response.data).toStrictEqual({ ...order, total: 30 });
  expect(response.status).toBe(201);
});