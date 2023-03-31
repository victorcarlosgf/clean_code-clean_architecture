import ICalculateFreight from "./calculate-freight.interface";
import Freight from "../../../domain/entities/freight.entity";
import { CalculateFreightInput, CalculateFreightOutput } from "./calculate-freight.dto";
import IZipcodeRepository from "../../../domain/repository/zipcode.interface.rep";
import IFreightRepository from "../../../domain/repository/freight.interface.rep";

export default class CalculateFreight implements ICalculateFreight {

  constructor(
    readonly zipcodeRepository: IZipcodeRepository,
    readonly freightRepository: IFreightRepository
  ) { }

  async execute(calculateFreightInput: CalculateFreightInput): Promise<CalculateFreightOutput> {

    const freight = new Freight(
      calculateFreightInput.volume,
      calculateFreightInput.density
    );

    if (calculateFreightInput.from && calculateFreightInput.to) {
      const from = await this.zipcodeRepository.findByCode(calculateFreightInput.from);
      const to = await this.zipcodeRepository.findByCode(calculateFreightInput.to);

      freight.calculateDistance(from.coordinates, to.coordinates);
    }

    freight.calculateValue(
      calculateFreightInput.volume,
      calculateFreightInput.density,
      freight.distance
    );

    await this.freightRepository.save(freight);

    return { total: freight.value };
  }
}