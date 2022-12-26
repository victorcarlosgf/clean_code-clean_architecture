import Coupon from "../../src/domain/entities/coupon.entity";
import Customer from "../../src/domain/entities/customer.entity";
import OrderItem from "../../src/domain/entities/order-item.entity";
import Order from "../../src/domain/entities/order.entity";
import Product from "../../src/domain/entities/product.entity";

test("Deve criar um código para o pedido", function () {
  const customer = new Customer('Batman', '714.602.380-01', 'batman@gmail.com');
  const order = new Order(customer);
  const code = order.generateCode(1);
  expect(code).toBe("202200000001");
});

test("Não deve criar um código para o pedido se a sequence for negativa", function () {
  const customer = new Customer('Batman', '714.602.380-01', 'batman@gmail.com');
  const order = new Order(customer);
  expect(() => order.generateCode(-1)).toThrow(new Error("Invalid sequence"));
});

test("Deve criar um pedido vazio com CPF válido", function () {
  const customer = new Customer('Batman', '714.602.380-01', 'batman@gmail.com');
  const order = new Order(customer);
  expect(order.getTotal()).toBe(0);
});

test("Não deve criar um pedido com CPF inválido", function () {
  expect(() => new Order(new Customer('Batman', '111.111.111-11', 'batman@gmail.com'))).toThrow(new Error("Document invalid"));
});

test("Deve criar um pedido com 3 itens", function () {
  const customer = new Customer('Batman', '714.602.380-01', 'batman@gmail.com');
  const order = new Order(customer);
  order.addItem(new OrderItem(new Product('1', 'A', 'a', { width: 100, height: 30, length: 10 }, 3, 1000), 1));
  order.addItem(new OrderItem(new Product('2', 'B', 'b', { width: 50, height: 50, length: 50 }, 22, 5000), 1));
  order.addItem(new OrderItem(new Product('3', 'C', 'c', { width: 10, height: 10, length: 10 }, 1, 30), 3));
  order.setFreight(280);
  expect(order.getTotal()).toBe(6370);
});

test("Deve criar um pedido com 3 itens com cupom de desconto", function () {
  const customer = new Customer('Batman', '714.602.380-01', 'batman@gmail.com');
  const order = new Order(customer);
  order.addItem(new OrderItem(new Product('1', 'A', 'a', { width: 100, height: 30, length: 10 }, 3, 1000), 1));
  order.addItem(new OrderItem(new Product('2', 'B', 'b', { width: 50, height: 50, length: 50 }, 22, 5000), 1));
  order.addItem(new OrderItem(new Product('3', 'C', 'c', { width: 10, height: 10, length: 10 }, 1, 30), 3));
  order.addCoupon(new Coupon("VALE20", 20, new Date("2023-12-10T10:00:00")));
  order.setFreight(280);
  expect(order.getTotal()).toBe(5152);
});

test("Não deve criar um pedido com item com quantidade negativa", function () {
  const customer = new Customer('Batman', '714.602.380-01', 'batman@gmail.com');
  const order = new Order(customer);
  expect(() => order.addItem(new OrderItem(new Product('1', 'A', 'a', { width: 100, height: 30, length: 10 }, 3, 1000), -1)))
    .toThrow(new Error("Quantity must be positive"));
});

test("Não deve criar um pedido com item duplicado", function () {
  const customer = new Customer('Batman', '714.602.380-01', 'batman@gmail.com');
  const order = new Order(customer);
  order.addItem(new OrderItem(new Product('1', 'A', 'a', { width: 100, height: 30, length: 10 }, 3, 1000), 1));
  expect(() => order.addItem(new OrderItem(new Product('1', 'A', 'a', { width: 100, height: 30, length: 10 }, 3, 1000), 1)))
    .toThrow(new Error("Duplicated product"));
});

test("Deve criar um pedido com 3 itens com código", function () {
  const customer = new Customer('Batman', '714.602.380-01', 'batman@gmail.com');
  const order = new Order(customer);
  order.addItem(new OrderItem(new Product('1', 'A', 'a', { width: 100, height: 30, length: 10 }, 3, 1000), 1));
  order.addItem(new OrderItem(new Product('2', 'B', 'b', { width: 50, height: 50, length: 50 }, 22, 5000), 1));
  order.addItem(new OrderItem(new Product('3', 'C', 'c', { width: 10, height: 10, length: 10 }, 1, 30), 3));
  expect(order.generateCode(1)).toBe("202200000001");
});