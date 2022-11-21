import IHttpServer from "../infra/http-server";

export default class HealthcheckController {

  constructor(
    readonly httpServer: IHttpServer,
  ) {
    httpServer.register("get", "/healthcheck", async (params: any, body: any) => {
      return {
        data: 'OK',
        status: 200
      };
    });
  }
}