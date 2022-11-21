import { createOrderInput } from "./create-order.dto";

export default interface ICreateOrder {
  execute(orderInput: createOrderInput): Promise<any>
}