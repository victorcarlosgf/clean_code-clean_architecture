import { GetProductsOutput } from './get-products.dto';

export default interface IGetProducts {
  execute(): Promise<GetProductsOutput>
}