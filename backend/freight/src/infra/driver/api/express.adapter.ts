import express from "express";
import IHttpServer from "./http-server";

type Output = {
  data: object
  status: number
}

export default class ExpressAdapter implements IHttpServer {
  app: any;

  constructor() {
    this.app = express();
  }

  async on(method: string, url: string, callback: Function): Promise<void> {
    this.app.use(express.json())
    this.app[method](url, async function (req: any, res: any) {
      const output: Output = await callback(req.params, req.body);
      res.status(output.status).json(output.data);
    });
  }

  async listen(port: number): Promise<void> {
    return this.app.listen(port);
  }
}