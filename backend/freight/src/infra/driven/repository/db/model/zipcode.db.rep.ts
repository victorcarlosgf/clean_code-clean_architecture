import IZipcodeRepository from "../../../../../domain/repository/zipcode.interface.rep";
import Zipcode from "../../../../../domain/entities/zipcode.entity";
import PrismaAdapter from "../prisma.adapter";

export default class ZipcodeDBRepository implements IZipcodeRepository {
  public connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(zipcode: Zipcode): Promise<Zipcode> {
    const zipcodeCreated = await this.connection.prisma.zipcode.create({
      data: {
        code: zipcode.code,
        street: zipcode.street,
        neighborhood: zipcode.neighborhood,
        lat: zipcode.lat,
        long: zipcode.long
      }
    })

    return this.toEntity(zipcodeCreated);
  }

  async findByCode(zipcodeCode: string): Promise<Zipcode> {
    const zipcodeFound = await this.connection.prisma.zipcode.findFirst(
      {
        where: {
          code: zipcodeCode
        }
      }
    )

    return this.toEntity(zipcodeFound);
  }

  private toEntity(model: any): Zipcode {
    return new Zipcode(
      model.code,
      model.street,
      model.neighborhood,
      model.lat,
      model.long
    )
  }
}