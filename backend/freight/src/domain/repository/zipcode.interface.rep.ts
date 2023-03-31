import Zipcode from "../entities/zipcode.entity";

export default interface IZipcodeRepository {
  save(zipcode: Zipcode): Promise<Zipcode>
  findByCode(zipcodeCode: string): Promise<Zipcode>;
}