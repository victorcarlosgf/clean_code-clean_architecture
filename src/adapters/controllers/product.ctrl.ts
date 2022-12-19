import IHttpServer from "../../infra/driver/api/http-server";
import ICreateProduct from "../../application/use-cases/product/create-product/create-product.interface";
import { CreateProductDimensionInput, CreateProductInput } from "../../application/use-cases/product/create-product/create-product.dto";

export default class ProductController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly createProduct: ICreateProduct
  ) {
    httpServer.register("post", "/product", async (params: any, body: any) => {
      const createProductDimensionInput: CreateProductDimensionInput = {
        width: body.dimension.width,
        height: body.dimension.height,
        length: body.dimension.length
      };

      const createProductInput: CreateProductInput = {
        name: body.name,
        description: body.description,
        dimension: createProductDimensionInput,
        weight: body.weight,
        value: body.value,
        currency: body.currency
      };

      return createProduct.execute(createProductInput);
    });
  }
}