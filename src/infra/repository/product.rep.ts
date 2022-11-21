import PrismaAdapter from "../../adapters/prisma.adapter";
import Product from "../../entities/product.entity";

export default class ProductRepository {
  connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(product: Product): Promise<any> {
    return this.connection.prisma.product.create({
      data: {
        description: product.description,
        value: product.value
      }
    })
  }

  async findMany(products: string[]): Promise<any> {
    return this.connection.prisma.product.findMany(
      {
        where: {
          id: {
            in: products
          }
        }
      }
    )
  }
}