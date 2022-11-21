import ICreateClient from "./create-client.gateway";
import { createClientInput } from "./create-client.dto";
import Client from "../../../entities/client.entity";
import ClientRepository from "../../../infra/repository/client.rep";

export default class CreateClient implements ICreateClient {

  constructor(
    readonly db: ClientRepository
  ) { }

  async execute(clientInput: createClientInput): Promise<any> {
    const client = new Client(clientInput.name, clientInput.document);

    const clientSaved = await this.db.save(client);

    return {
      data: clientSaved,
      status: 201
    };
  }
}