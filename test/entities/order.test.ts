import Customer from "../../src/domain/entities/customer.entity";
import OrderItem from "../../src/domain/entities/order-item.entity";
import Order from "../../src/domain/entities/order.entity";
import Product from "../../src/domain/entities/product.entity";

test("Deve criar um código para o pedido", function () {
  const customer = new Customer('Batman', '714.602.380-01', 'batman@gmail.com');
  const items = [
    new OrderItem(new Product('mug', 'mug batman', { width: 1, height: 2, length: 1 }, 1, 3), 2)
  ];
  const order = new Order(customer, items);
  const code = order.generateCode(1);
  expect(code).toBe("202200000001");
});

test("Não deve criar um código para o pedido se a sequence for negativa", function () {
  const customer = new Customer('Batman', '714.602.380-01', 'batman@gmail.com');
  const items = [
    new OrderItem(new Product('mug', 'mug batman', { width: 1, height: 2, length: 1 }, 1, 3), 2)
  ];
  const order = new Order(customer, items);
  expect(() => order.generateCode(-1)).toThrow(new Error("Invalid sequence"));
});