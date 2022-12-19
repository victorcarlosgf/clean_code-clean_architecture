import { CreateOrderInput, CreateOrderItemInput } from "../../application/use-cases/order/create-order/create-order.dto";
import ICreateOrder from "../../application/use-cases/order/create-order/create-order.interface";
import { GetOrderInput } from "../../application/use-cases/order/get-order/get-order.dto";
import IGetOrder from "../../application/use-cases/order/get-order/get-order.interface";
import IHttpServer from "../../infra/driver/api/http-server";

export default class OrderController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly createOrder: ICreateOrder,
    readonly getOrder: IGetOrder,
  ) {
    httpServer.register("post", "/order", async (params: any, body: any) => {
      let orderItems: CreateOrderItemInput[] = [];
      for (const itemInput of body.items) {
        const orderItem = {
          productName: itemInput.product_name,
          quantity: itemInput.quantity
        }
        orderItems.push(orderItem);
      };

      const createOrderInput: CreateOrderInput = {
        customerDocument: body.customer_document,
        items: orderItems,
        couponCode: body.coupon_code,
      };

      return createOrder.execute(createOrderInput);
    });

    httpServer.register("get", "/order", async (params: any, body: any) => {
      const getOrderInput: GetOrderInput = {
        document: body.document,
        code: body.code,
      };

      return getOrder.execute(getOrderInput);
    });
  }
}