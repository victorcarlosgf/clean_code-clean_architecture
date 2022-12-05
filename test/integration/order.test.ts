import CreateOrder from "../../src/application/use-case/order/create-order/create-order.usecase";
import { CreateOrderInput } from "../../src/application/use-case/order/create-order/create-order.dto";
import DBRepositoryFactory from "../../src/infra/db/repository/repository-factory";
import ProductRepository from "../../src/infra/db/repository/product.rep";
import CustomerRepository from "../../src/infra/db/repository/customer.rep";
import ICustomerRepository from "../../src/domain/repository/customer.interface.rep";

const customerIdInput = '0418c364-91cd-4ddf-af47-fadcba998496';

const product1: any = {
  id: '1',
  name: "Tenis nike",
  description: "Tenis nike 39",
  volume: 20,
  density: 3,
  value: 50
};

const product2: any = {
  id: '2',
  name: "Tenis adidas",
  description: "Tenis nike 39",
  volume: 20,
  density: 3,
  value: 50
};

const product3: any = {
  id: '3',
  name: "Tenis adidas",
  description: "Tenis nike 39",
  volume: 20,
  density: 3,
  value: 50
};

const item1: any = {
  productId: product1.id,
  quantity: 3,
};

const item2: any = {
  productId: product2.id,
  quantity: 5
};

const item3: any = {
  productId: product3.id,
  quantity: 5
};

const items: any = [];
items.push(item1);
items.push(item2);
items.push(item3);

const createOrderInput: CreateOrderInput = {
  customerId: customerIdInput,
  items: items,
}

let createOrder: any;
let repositoryFactory: any;
let customerRepository: CustomerRepository;
let productRepository: any;
let orderRepository: any;
// let customerRepository: any = {
//   findUnique: jest.fn(),
// };

describe('Create Order', () => {
  beforeEach(() => {
    repositoryFactory = new DBRepositoryFactory();
    customerRepository = repositoryFactory.createCustomerRepository();
    productRepository = repositoryFactory.createProductRepository();
    orderRepository = repositoryFactory.createCustomerRepository();

    createOrder = new CreateOrder(repositoryFactory);
  });

  test("Não deve fazer um pedido com cpf inválido", async () => {

    const customerRepository: ICustomerRepository = {
      async findUnique(customerId: string): Promise<any> {
        const customer = {
          id: '0418c364-91cd-4ddf-af47-fadcba998496',
          name: "Victor Freitas",
          document: "67192650160",
          createdAt: "2022-11-24T18:27:08.087Z"
        };

        return customer;
      },
      async save() { }
    }

    jest.spyOn(customerRepository, 'findUnique').mockImplementation(() =>
      Promise.resolve(customerRepository));

    await expect(async () => await createOrder.execute(createOrderInput))
      .rejects
      .toThrow(new Error('Document invalid'));
  });

  // test.only("Deve fazer um pedido com 3 produtos", async function () {
  //   const customer = {
  //     id: '0418c364-91cd-4ddf-af47-fadcba998496',
  //     name: "Victor Freitas",
  //     document: "77115294739",
  //     createdAt: "2022-11-24T18:27:08.087Z"
  //   };

  //   customerRepositoryMock.findUnique.mockImplementation(() =>
  //     Promise.resolve(customer));

  //   jest.spyOn(productRepository, 'findUnique').mockImplementation(() =>
  //     Promise.resolve(product1));
  //   jest.spyOn(productRepository, 'findUnique').mockImplementation(() =>
  //     Promise.resolve(product2));
  //   jest.spyOn(productRepository, 'findUnique').mockImplementation(() =>
  //     Promise.resolve(product3));

  //   const response = await createOrder.execute(createOrderInput);
  //   expect(response.data.total).toBe(650);
  //   expect(response.status).toBe(201);
  // });

  // test("Deve fazer um pedido com 3 produtos com cupom de desconto", async function () {
  //   const customer = {
  //     id: '0418c364-91cd-4ddf-af47-fadcba998496',
  //     name: "Victor Freitas",
  //     document: "77115294739",
  //     createdAt: "2022-11-24T18:27:08.087Z"
  //   };

  //   jest.spyOn(customerRepository, 'findUnique').mockImplementation(() =>
  //     Promise.resolve(customer));

  //   jest.spyOn(productRepository, 'findUnique').mockImplementation(() =>
  //     Promise.resolve(product1));

  //   const response = await createOrder.execute(createOrderInput);
  //   expect(response.data.total).toBe(650);
  //   expect(response.status).toBe(201);
  // });
});
