import { CreateOrderInput, OrderItemInput } from "../../application/use-case/order/create-order/create-order.dto";
import ICreateOrder from "../../application/use-case/order/create-order/create-order.interface";
import IHttpServer from "../../infra/api/http-server";

export default class OrderController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly createOrder: ICreateOrder
  ) {
    httpServer.register("post", "/order", async (params: any, body: any) => {
      let orderItems: OrderItemInput[] = [];
      body.items.map((itemInput: any) => {
        const orderItem = {
          productId: itemInput.product_id,
          quantity: itemInput.quantity
        }

        orderItems.push(orderItem);
      });

      const createOrderInput: CreateOrderInput = {
        customerId: body.customer_id,
        items: orderItems
      }

      return createOrder.execute(createOrderInput);
    });
  }
}