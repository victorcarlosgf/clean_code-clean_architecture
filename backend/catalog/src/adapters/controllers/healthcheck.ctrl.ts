import IHttpServer from '../../infra/driver/api/http-server.interface';

export default class HealthcheckController {
  constructor(readonly httpServer: IHttpServer) {
    httpServer.on('get', '/healthcheck', async () => {
      return {
        data: 'OK',
        status: 200,
      };
    });
  }
}
