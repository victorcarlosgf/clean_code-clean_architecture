import { SimulateFreightInput, SimulateFreightItemInput } from "../../application/use-cases/simulate-freight/simulate-freight.dto";
import ISimulateFreight from "../../application/use-cases/simulate-freight/simulate-freight.interface";
import IHttpServer from "../../infra/driver/api/http-server";

export default class FreightController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly simulateFreight: ISimulateFreight
  ) {
    httpServer.register("get", "/freight/simulate", async (params: any, body: any) => {
      let items: SimulateFreightItemInput[] = [];
      for (const itemInput of body.items) {
        const item: SimulateFreightItemInput = {
          productName: itemInput.product_name,
          quantity: itemInput.quantity
        }
        items.push(item);
      };

      const simulateFreightInput: SimulateFreightInput = { items };
      return simulateFreight.execute(simulateFreightInput);
    });
  }
}