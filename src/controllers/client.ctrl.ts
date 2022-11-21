import IHttpServer from "../infra/http-server";
import ICreateClient from "../use-case/client/create-client/create-client.gateway";

export default class ClientController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly createClient: ICreateClient
  ) {
    httpServer.register("post", "/client", async (params: any, body: any) => {
      const createClientInput = {
        name: body.name,
        document: body.document,
      };

      return createClient.execute(createClientInput);
    });
  }
}