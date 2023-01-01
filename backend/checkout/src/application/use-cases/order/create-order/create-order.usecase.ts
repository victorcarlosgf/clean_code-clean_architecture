import ICreateOrder from "./create-order.interface";
import IOrderRepository from "../../../../domain/repository/order.interface.rep";
import Order from "../../../../domain/entities/order.entity";
import OrderItem from "../../../../domain/entities/order-item.entity";
import ICurrencyGateway from "../../../../adapters/gateways/currency/currency.gateway.interface";
import CurrencyRandomGateway from "../../../../adapters/gateways/currency/currency-random.gateway";
import { CreateOrderInput, CreateOrderOutput } from "./create-order.dto";
import ICustomerGateway from "../../../../adapters/gateways/customer/customer.gateway.interface";
import ICatalogGateway from "../../../../adapters/gateways/catalog/catalog.gateway.interface";
import IFreightGateway from "../../../../adapters/gateways/freight/freight.gateway.interface";

export default class CreateOrder implements ICreateOrder {
  constructor(
    readonly orderRepository: IOrderRepository,
    readonly customerGateway: ICustomerGateway,
    readonly catalogGateway: ICatalogGateway,
    readonly freightGateway: IFreightGateway,
    readonly currencyGateway: ICurrencyGateway = new CurrencyRandomGateway()
  ) {}

  async execute(
    createOrderInput: CreateOrderInput
  ): Promise<CreateOrderOutput> {
    const customer = await this.customerGateway.getCustomer(
      createOrderInput.customerDocument
    );

    if (!customer) throw new Error("Customer not found");

    const order = new Order(customer);

    for (const orderItemInput of createOrderInput.items) {
      const product = await this.catalogGateway.getProduct(
        orderItemInput.productName
      );

      if (!product) {
        throw new Error("Product not found");
      }

      const orderItem = new OrderItem(product, orderItemInput.quantity);

      order.addItem(orderItem);
    }

    if (createOrderInput.couponCode) {
      console.log(createOrderInput.couponCode);
    }

    const freight = await this.freightGateway.calculateFreight(
      order.getVolume(),
      order.getDensity(),
      createOrderInput.from,
      createOrderInput.to
    );

    order.setFreight(freight);

    const orderSaved = await this.orderRepository.save(order);

    const total = order.getTotal();

    return {
      data: {
        ...orderSaved,
        total,
      },
      status: 201,
    };
  }
}
