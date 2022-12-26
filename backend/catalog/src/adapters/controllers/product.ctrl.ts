import IHttpServer from "../../infra/driver/api/http-server";
import ICreateProduct from "../../application/use-cases/product/create-product/create-product.interface";
import { CreateProductDimensionInput, CreateProductInput } from "../../application/use-cases/product/create-product/create-product.dto";
import IGetProduct from "../../application/use-cases/product/get-product/get-product.interface";
import IGetProducts from "../../application/use-cases/product/get-products/get-products.interface";

export default class ProductController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly createProduct: ICreateProduct,
    readonly getProduct: IGetProduct,
    readonly getProducts: IGetProducts
  ) {
    httpServer.on("post", "/product", async (params: any, body: any) => {
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

    httpServer.on("get", "/product/:nameProduct", async (params: any, body: any) => {
      return getProduct.execute(params.nameProduct);
    });

    httpServer.on("get", "/products", async (params: any, body: any) => {
      return getProducts.execute();
    });
  }
}