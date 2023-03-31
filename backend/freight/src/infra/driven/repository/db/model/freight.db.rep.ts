import IFreightRepository from "../../../../../domain/repository/freight.interface.rep";
import Freight from "../../../../../domain/entities/freight.entity";
import PrismaAdapter from "../prisma.adapter";

export default class FreightDBRepository implements IFreightRepository {
  public connection: PrismaAdapter;

  constructor() {
    this.connection = new PrismaAdapter();
  }

  async save(freight: Freight): Promise<Freight> {
    const zipcodeCreated = await this.connection.prisma.freight.create({
      data: {
        distance: parseInt(freight.distance.toFixed()),
        volume: freight.volume,
        density: freight.density,
        value: parseInt(freight.value.toFixed())
      }
    })

    return this.toEntity(zipcodeCreated);
  }

  private toEntity(model: any): Freight {
    return new Freight(
      model.volume,
      model.density
    )
  }
}