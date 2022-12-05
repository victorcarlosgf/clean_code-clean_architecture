import ICreateOrder from "./create-order.interface";
import { CreateOrderInput, OrderItemInput } from "./create-order.dto";
import IRepositoryFactory from "../../../../domain/repository/repository-factory.interface";
import ICustomerRepository from "../../../../domain/repository/customer.interface.rep";
import IProductRepository from "../../../../domain/repository/product.interface.rep";
import IOrderRepository from "../../../../domain/repository/order.interface.rep";
import Customer from "../../../../domain/entities/customer.entity";
import Product from "../../../../domain/entities/product.entity";
import Order from "../../../../domain/entities/order.entity";
import OrderItem from "../../../../domain/entities/order-item.entity";
import ICurrencyGateway from "../../../../adapters/gateways/currency/currency.gateway.interface";
import CurrencyRandomGateway from "../../../../adapters/gateways/currency/currency-random.gateway";

export default class CreateOrder implements ICreateOrder {
  private customerRepository: ICustomerRepository;
  private productRepository: IProductRepository;
  private orderRepository: IOrderRepository;

  constructor(
    repositoryFactory: IRepositoryFactory,
    readonly currencyGateway: ICurrencyGateway = new CurrencyRandomGateway(),
  ) {
    this.customerRepository = repositoryFactory.createCustomerRepository();
    this.productRepository = repositoryFactory.createProductRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(orderInput: CreateOrderInput) {
    const customerFound = await this.customerRepository
      .findByDocument(orderInput.customerDocument);

    if (!customerFound)
      throw new Error('Customer not found');

    const customer = new Customer(
      customerFound.name,
      customerFound.document,
      customerFound.id,
    );

    let orderItems: OrderItem[] = [];

    await Promise.all(orderInput.items.map(async (item: OrderItemInput) => {
      const productFound = await this.productRepository
        .findUnique(item.productId);

      if (!productFound) {
        throw new Error('Product not found');
      }

      const product = new Product(
        productFound.name,
        productFound.description,
        productFound.volume,
        productFound.density,
        productFound.value,
        productFound.id,
      );

      const orderItem = new OrderItem(product, item.quantity);
      orderItems.push(orderItem);
    }));

    const order = new Order(customer, orderItems);

    const orderSaved = await this.orderRepository
      .save(order);

    // const orderSaved = {};
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