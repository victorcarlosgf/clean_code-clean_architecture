import ICreateCustomer from "../../application/use-case/customer/create-customer/create-customer.interface";
import IHttpServer from "../../infra/api/http-server";


export default class CustomerController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly createClient: ICreateCustomer
  ) {
    httpServer.register("post", "/customer", async (params: any, body: any) => {
      const createCustomerInput = {
        name: body.name,
        document: body.document,
      };

      return createClient.execute(createCustomerInput);
    });
  }
}