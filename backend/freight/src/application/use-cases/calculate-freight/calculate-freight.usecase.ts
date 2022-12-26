import ICalculateFreight from "./calculate-freight.interface";
import Freight from "../../../domain/entities/freight.entity";
import { CalculateFreightInput, CalculateFreightOutput } from "./calculate-freight.dto";
import IZipcodeRepository from "../../../domain/repository/zipcode.interface.rep";

export default class CalculateFreight implements ICalculateFreight {

  constructor(readonly zipcodeRepository: IZipcodeRepository) { }

  async execute(calculateFreightInput: CalculateFreightInput): Promise<CalculateFreightOutput> {
    let distance;
    const freight = new Freight();
    if (calculateFreightInput.from && calculateFreightInput.to) {
      const from = await this.zipcodeRepository.findByCode(calculateFreightInput.from);
      const to = await this.zipcodeRepository.findByCode(calculateFreightInput.to);
      distance = freight.calculateDistance(from.coordinates, to.coordinates);
    }

    const total = freight.calculateValue(
      calculateFreightInput.volume,
      calculateFreightInput.density,
      distance
    );

    return { total };
  }
}