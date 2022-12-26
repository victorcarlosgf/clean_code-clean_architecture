import Zipcode from "../../../../../domain/entities/zipcode.entity";
import IZipcodeRepository from "../../../../../domain/repository/zipcode.interface.rep";
import PrismaAdapter from "../prisma.adapter";

export default class ZipcodeDBRepository implements IZipcodeRepository {
  connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(zipcode: Zipcode): Promise<any> {
    return this.connection.prisma.zipcode.create({
      data: {
        code: zipcode.code,
        street: zipcode.street,
        neighborhood: zipcode.neighborhood,
        lat: zipcode.lat,
        long: zipcode.long
      }
    })
  }

  async findByCode(zipcodeCode: string): Promise<any> {
    const productfound = await this.connection.prisma.zipcode.findFirst(
      {
        where: {
          code: zipcodeCode
        },
        orderBy: {
          id: "desc"
        }
      }
    )
    console.log(this.toEntity(productfound))
    return productfound;
  }

  private toEntity(model: any): any {
    console.log('MODELLL');
    console.log(model);
  }
}