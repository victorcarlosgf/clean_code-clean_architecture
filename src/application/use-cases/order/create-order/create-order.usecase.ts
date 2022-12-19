import ICreateOrder from "./create-order.interface";
import ICustomerRepository from "../../../../domain/repository/customer.interface.rep";
import IProductRepository from "../../../../domain/repository/product.interface.rep";
import IOrderRepository from "../../../../domain/repository/order.interface.rep";
import Customer from "../../../../domain/entities/customer.entity";
import Product from "../../../../domain/entities/product.entity";
import Order from "../../../../domain/entities/order.entity";
import OrderItem from "../../../../domain/entities/order-item.entity";
import ICurrencyGateway from "../../../../adapters/gateways/currency/currency.gateway.interface";
import CurrencyRandomGateway from "../../../../adapters/gateways/currency/currency-random.gateway";
import { CreateOrderInput } from "./create-order.dto";

export default class CreateOrder implements ICreateOrder {

  constructor(
    readonly customerRepository: ICustomerRepository,
    readonly productRepository: IProductRepository,
    readonly orderRepository: IOrderRepository,
    readonly currencyGateway: ICurrencyGateway = new CurrencyRandomGateway(),
  ) { }

  async execute(createOrderInput: CreateOrderInput) {
    const customerFound = await this.customerRepository
      .findByDocument(createOrderInput.customerDocument);

    if (!customerFound)
      throw new Error('Customer not found');

    const customer = new Customer(
      customerFound.name,
      customerFound.document,
      customerFound.email,
      customerFound.id,
    );

    let orderItems: OrderItem[] = [];

    for (const orderItemInput of createOrderInput.items) {
      const productFound = await this.productRepository
        .findByName(orderItemInput.productName);

      if (!productFound) {
        throw new Error('Product not found');
      }

      const product = new Product(
        productFound.name,
        productFound.description,
        {
          width: productFound.width,
          height: productFound.height,
          length: productFound.length
        },
        productFound.weight,
        productFound.value,
        productFound.currency,
        undefined,
        productFound.id,
      );

      const orderItem = new OrderItem(product, orderItemInput.quantity);
      orderItems.push(orderItem);
    };

    if (createOrderInput.couponCode) {
      console.log(createOrderInput.couponCode);
    }

    const order = new Order(customer, orderItems);

    const orderSaved = await this.orderRepository
      .save(order);

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