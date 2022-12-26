import { CreateCustomerInput } from "../../application/use-cases/customer/create-customer/create-customer.dto";
import ICreateCustomer from "../../application/use-cases/customer/create-customer/create-customer.interface";
import IHttpServer from "../../infra/driver/api/http-server";


export default class CustomerController {

  constructor(
    readonly httpServer: IHttpServer,
    readonly createClient: ICreateCustomer
  ) {
    httpServer.on("post", "/customer", async (params: any, body: any) => {
      const createCustomerInput: CreateCustomerInput = {
        name: body.name,
        document: body.document,
        email: body.email
      };

      return createClient.execute(createCustomerInput);
    });
  }
}