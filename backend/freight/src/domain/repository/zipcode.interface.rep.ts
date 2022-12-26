import Zipcode from "../entities/zipcode.entity";

export default interface IZipcodeRepository {
  save(zipcode: Zipcode): Promise<any>
  findByCode(zipcodeCode: string): Promise<Zipcode>;
}