import IHttpServer from "../infra/http-server";
import ICreateProduct from "../use-case/product/create-product/create-product.gateway";

export default class ProductController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly createProduct: ICreateProduct
  ) {
    httpServer.register("post", "/product", async (params: any, body: any) => {
      const createProductInput = {
        description: body.description,
        value: body.value
      };

      return createProduct.execute(createProductInput);
    });
  }
}