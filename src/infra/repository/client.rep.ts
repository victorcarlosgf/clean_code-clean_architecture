import PrismaAdapter from "../../adapters/prisma.adapter";
import Client from "../../entities/client.entity";

export default class ClientRepository {
  connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(client: Client): Promise<any> {
    return this.connection.prisma.client.create({
      data: {
        name: client.name,
        document: client.document
      }
    })
  }

  async findUnique(clientId: string): Promise<any> {
    return this.connection.prisma.client.findUnique(
      {
        where: {
          id: clientId
        }
      }
    )
  }
}