import { GetOrderInput, GetOrderOutput } from "./get-order.dto";

export default interface IGetOrder {
  execute(getOrderInput: GetOrderInput): Promise<GetOrderOutput>
}