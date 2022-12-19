import { CreateOrderInput, CreateOrderOutput } from "./create-order.dto";

export default interface ICreateOrder {
  execute(orderInput: CreateOrderInput): Promise<CreateOrderOutput>
}