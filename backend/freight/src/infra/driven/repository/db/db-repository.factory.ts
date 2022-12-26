import IRepositoryFactory from "../../../../domain/repository/repository-factory.interface";
import IZipcodeRepository from "../../../../domain/repository/zipcode.interface.rep";
import ZipcodeDBRepository from "./model/zipcode.db.rep";

export default class DBRepositoryFactory implements IRepositoryFactory {

  constructor() { }

  createZipcodeRepository(): IZipcodeRepository {
    return new ZipcodeDBRepository();
  }
}