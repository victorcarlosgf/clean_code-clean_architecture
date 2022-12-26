import CreateOrder from "../../src/application/use-cases/order/create-order/create-order.usecase";
import { CreateOrderInput } from "../../src/application/use-cases/order/create-order/create-order.dto";
import ICustomerGateway from "../../src/adapters/gateways/customer/customer.gateway.interface";
import IOrderRepository from "../../src/domain/repository/order.interface.rep";
import ICatalogGateway from "../../src/adapters/gateways/catalog/catalog.gateway.interface";
import Product from "../../src/domain/entities/product.entity";
import IFreightGateway from "../../src/adapters/gateways/freight/freight.gateway.interface";
import ICreateOrder from "../../src/application/use-cases/order/create-order/create-order.interface";
import Currency from "../../src/domain/entities/currency.entity";
import ICurrencyGateway from "../../src/adapters/gateways/currency/currency.gateway.interface";

const product1 = new Product('1', 'A', 'a', { width: 100, height: 30, length: 10 }, 3, 1000);
const product2 = new Product('2', 'B', 'b', { width: 50, height: 50, length: 50 }, 22, 5000);
const product3 = new Product('3', 'C', 'c', { width: 10, height: 10, length: 10 }, 1, 30);

const createOrderInput: CreateOrderInput = {
  customerDocument: '714.602.380-01',
  items: [
    {
      productName: 'A',
      quantity: 1
    },
    {
      productName: 'B',
      quantity: 1
    },
    {
      productName: 'C',
      quantity: 3
    }
  ],
};

const customer = {
  id: '0418c364-91cd-4ddf-af47-fadcba998496',
  name: "Victor Freitas",
  document: "67192650160",
  email: "batman@gmail.com",
  createdAt: "2022-11-24T18:27:08.087Z"
};

const currencies = new Currency();
currencies.addCurrency("USD", 2);
currencies.addCurrency("BRL", 1);

const customerGateway: ICustomerGateway = {
  getCustomer: jest.fn().mockResolvedValue(customer)
};

const catalogGateway: ICatalogGateway = {
  getProduct: jest.fn()
    .mockRejectedValueOnce(product1)
    .mockRejectedValueOnce(product2)
    .mockRejectedValueOnce(product3)
}

const currencyGateway: ICurrencyGateway = {
  getCurrencies: jest.fn().mockResolvedValue(currencies)
}

const freightGateway: IFreightGateway = {
  calculateFreight: jest.fn().mockResolvedValue(100)
}

const orderRepository: IOrderRepository = {
  save: jest.fn().mockResolvedValue(null),
  findByCode: jest.fn().mockResolvedValue(null),
  findByDocument: jest.fn().mockResolvedValue(null),
}

let createOrder: ICreateOrder;

beforeAll(() => {
  createOrder = new CreateOrder(
    orderRepository,
    customerGateway,
    catalogGateway,
    freightGateway,
    currencyGateway
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Create Order', () => {
  // test("Não deve fazer um pedido com cpf inválido", async () => {
  //   expect(await createOrder.execute(createOrderInput))
  //     .toThrow(new Error('Document invalid'));
  // });

  test.only("Deve fazer um pedido com 3 produtos", async function () {
    const output = await createOrder.execute(createOrderInput);
    expect(output.data.total).toBe(6370);
  });

  test("Deve fazer um pedido com 4 produtos com moedas diferentes", async function () {
    const input = {
      customerDocument: createOrderInput.customerDocument,
      items: [
        { productName: 'A', quantity: 1 },
        { productName: 'B', quantity: 1 },
        { productName: 'C', quantity: 3 },
        { productName: 'D', quantity: 1 }
      ]
    };
    const output = await createOrder.execute(input);
    expect(output.data.total).toBe(6600);
  });

  test("Deve fazer um pedido com 3 produtos com código do pedido", async function () {
    const output = await createOrder.execute(createOrderInput);
    expect(output.data.code).toBe("202200000001");
  });

  test("Deve fazer um pedido com 3 produtos com CEP de origem e destino", async function () {
    const input = {
      from: "22030060",
      to: "88015600",
      ...createOrderInput
    };
    const output = await createOrder.execute(input);
    expect(output.data.total).toBe(6307.06);
  });
});
