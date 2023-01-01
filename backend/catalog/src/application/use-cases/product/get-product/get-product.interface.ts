import { GetProductInput, GetProductOutput } from './get-product.dto';

export default interface IGetProduct {
  execute(getProductInput: GetProductInput): Promise<GetProductOutput>
}