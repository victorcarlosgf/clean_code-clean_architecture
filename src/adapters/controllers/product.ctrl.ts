import IHttpServer from "../../infra/api/http-server";
import ICreateProduct from "../../application/use-case/product/create-product/create-product.interface";
import { CreateProductInput } from "../../application/use-case/product/create-product/create-product.dto";

export default class ProductController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly createProduct: ICreateProduct
  ) {
    httpServer.register("post", "/product", async (params: any, body: any) => {
      const createProductInput: CreateProductInput = {
        name: body.name,
        description: body.description,
        volume: body.volume,
        density: body.density,
        value: body.value
      };

      return createProduct.execute(createProductInput);
    });
  }
}