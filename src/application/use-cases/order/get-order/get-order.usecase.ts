import IOrderRepository from "../../../../domain/repository/order.interface.rep";
import { GetOrderInput, GetOrderOutput } from "./get-order.dto";

export default class GetOrder {

  constructor(readonly orderRepository: IOrderRepository) { }

  async execute(input: GetOrderInput): Promise<GetOrderOutput> {
    let orderFound;
    if (input.document) {
      orderFound = await this.orderRepository.findByDocument(input.document);
    }

    if (input.code) {
      orderFound = await this.orderRepository.findByCode(input.code);
    }
    
    return {
      total: orderFound.total
    }
  }
}