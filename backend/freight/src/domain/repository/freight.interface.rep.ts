import Freight from "../entities/freight.entity";

export default interface IFreightRepository {
  save(freight: Freight): Promise<Freight>;
}