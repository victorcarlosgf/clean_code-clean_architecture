import ICreateOrder from "./create-order.gateway";
import Client from "../../../entities/client.entity";
import Product from "../../../entities/product.entity";
import Order from "../../../entities/order.entity";
import { createOrderInput } from "./create-order.dto";
import ClientRepository from "../../../infra/repository/client.rep";
import ProductRepository from "../../../infra/repository/product.rep";
import OrderRepository from "../../../infra/repository/order.rep";

export default class CreateOrder implements ICreateOrder {

  constructor(
    readonly clientRepository: ClientRepository,
    readonly productRepository: ProductRepository,
    readonly orderRepository: OrderRepository
  ) { }

  async execute(orderInput: createOrderInput) {
    const clientFound = await this.clientRepository
      .findUnique(orderInput.clientId);

    if (!clientFound)
      throw new Error('Client not found');

    const client = new Client(clientFound.name, clientFound.document);

    const productsFound = await this.productRepository
      .findMany(orderInput.products)

    const products: any = [];
    productsFound.map(async (productFound: any) => {
      const product = new Product(productFound.description, productFound.value);
      products.push(product);
    });

    if (!products.length)
      throw new Error('Product not found');

    const order = new Order(client, products);

    const orderSaved = await this.orderRepository
      .save(orderInput.clientId, orderInput.products[0]);
    const total = order.getTotal();

    return {
      data: {
        ...orderSaved,
        total
      },
      status: 201
    };
  }
}