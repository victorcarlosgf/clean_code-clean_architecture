import { createProductInput } from "./create-product.dto";

export default interface ICreateProduct {
  execute(productInput: createProductInput): Promise<any>
}