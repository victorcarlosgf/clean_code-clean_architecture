import IProductRepository from '../../../../../domain/repository/product.interface.rep';
import Product from '../../../../../domain/entities/product.entity';
import PrismaAdapter from '../prisma.adapter';

export default class ProductDBRepository implements IProductRepository {
  connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(product: Product): Promise<any> {
    return this.connection.prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        width: product.dimension.width,
        height: product.dimension.height,
        length: product.dimension.length,
        weight: product.weight,
        value: product.value,
        currency: product.currency,
      },
    });
  }

  async findByName(productName: string): Promise<any> {
    const productfound = await this.connection.prisma.product.findFirst({
      where: {
        name: productName,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return productfound;
  }

  async findAll(): Promise<any> {
    return this.connection.prisma.product.findMany({
      orderBy: {
        id: 'desc',
      },
    });
  }

  private toEntity(model: any): any {
    console.log(model);
  }
}
