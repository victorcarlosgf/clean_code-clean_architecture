import { CreateZipcodeInput } from "../../application/use-cases/create-zipcode/create-zipcode.dto";
import ICreateZipcode from "../../application/use-cases/create-zipcode/create-zipcode.interface";
import IHttpServer from "../../infra/driver/api/http-server";

export default class ZipcodeController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly createZipcode: ICreateZipcode
  ) {
    httpServer.on("post", "/zipcode", async (params: any, body: any) => {
      const createZipcodeInput: CreateZipcodeInput = {
        code: body.code,
        street: body.street,
        neighborhood: body.neighborhood,
        lat: body.lat,
        long: body.long
      };

      const response = await createZipcode.execute(createZipcodeInput);

      return {
        data: response,
        status: 200
      }
    });
  }
}