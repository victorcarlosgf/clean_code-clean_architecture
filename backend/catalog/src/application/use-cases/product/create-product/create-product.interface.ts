import { CreateProductInput } from './create-product.dto';

export default interface ICreateProduct {
  execute(productInput: CreateProductInput): Promise<any>;
}