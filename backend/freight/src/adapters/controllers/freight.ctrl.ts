import { CalculateFreightInput } from "../../application/use-cases/calculate-freight/calculate-freight.dto";
import ICalculateFreight from "../../application/use-cases/calculate-freight/calculate-freight.interface";
import IHttpServer from "../../infra/driver/api/http-server";

export default class FreightController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly calculateFreight: ICalculateFreight
  ) {
    httpServer.on("post", "/calculate", async (params: any, body: any) => {
      const calculateFreightInput: CalculateFreightInput = {
        from: body.from,
        to: body.to,
        volume: body.volume,
        density: body.density
      }

      return calculateFreight.execute(calculateFreightInput);
    });
  }
}