import PrismaAdapter from "../../adapters/prisma.adapter";

export default class OrderRepository {
  connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(clientId: string, productId: string): Promise<any> {
    return this.connection.prisma.order.create({
      data: {
        clientId,
        productId
      }
    })
  }
}