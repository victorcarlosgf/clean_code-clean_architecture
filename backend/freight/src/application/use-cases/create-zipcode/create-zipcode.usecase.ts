import ICreateZipcode from "./create-zipcode.interface";
import IZipcodeRepository from "../../../domain/repository/zipcode.interface.rep";
import Zipcode from "../../../domain/entities/zipcode.entity";
import { CreateZipcodeInput, CreateZipcodeOutput } from "./create-zipcode.dto";

export default class CreateZipcode implements ICreateZipcode {

  constructor(
    readonly zipcodeRepository: IZipcodeRepository
  ) { }

  async execute(createZipcodeInput: CreateZipcodeInput): Promise<CreateZipcodeOutput> {

    const zipcode = new Zipcode(
      createZipcodeInput.code,
      createZipcodeInput.street,
      createZipcodeInput.neighborhood,
      createZipcodeInput.lat,
      createZipcodeInput.long
    );

    const zipcodeCreated = await this.zipcodeRepository.save(zipcode);

    return { ...zipcodeCreated };
  }
}