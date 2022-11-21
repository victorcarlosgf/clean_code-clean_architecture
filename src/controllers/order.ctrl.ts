import IHttpServer from "../infra/http-server";
import ICreateOrder from "../use-case/order/create-order/create-order.gateway";

export default class OrderController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly createOrder: ICreateOrder
  ) {
    httpServer.register("post", "/order", async (params: any, body: any) => {
      const createOrderInput = {
        clientId: body.client_id,
        products: body.products
      }

      return createOrder.execute(createOrderInput);
    });
  }
}