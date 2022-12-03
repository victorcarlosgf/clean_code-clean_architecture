import Product from "../../../domain/entities/product.entity";
import IProductRepository from "../../../domain/repository/product.interface.rep";
import PrismaAdapter from "../prisma.adapter";

export default class ProductRepository implements IProductRepository {
  connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(product: Product): Promise<any> {
    return this.connection.prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        volume: product.volume,
        density: product.density,
        value: product.value
      }
    })
  }

  async findUnique(productId: string): Promise<any> {
    return this.connection.prisma.product.findUnique(
      {
        where: {
          id: productId
        }
      }
    )
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