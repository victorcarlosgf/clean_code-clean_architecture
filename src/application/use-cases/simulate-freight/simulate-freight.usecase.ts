import OrderItem from "../../../domain/entities/order-item.entity";
import Freight from "../../../domain/entities/freight.entity";
import IProductRepository from "../../../domain/repository/product.interface.rep";
import ISimulateFreight from "./simulate-freight.interface";
import { SimulateFreightInput, SimulateFreightOutput } from "./simulate-freight.dto";
import Product from "../../../domain/entities/product.entity";

export default class SimulateFreight implements ISimulateFreight {

  constructor(readonly productRepository: IProductRepository) { }

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    let orderItems: OrderItem[] = [];
    for (const item of input.items) {
      const productFound = await this.productRepository
        .findByName(item.productName);

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

      const orderInput = new OrderItem(product, item.quantity);
      orderItems.push(orderInput);
    };
    const freight = new Freight();
    const total = freight.calculate(orderItems);

    return {
      data: {
        total
      },
      status: 200
    };
  }
}