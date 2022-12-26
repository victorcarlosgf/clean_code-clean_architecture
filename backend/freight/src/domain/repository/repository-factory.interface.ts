import IZipcodeRepository from "./zipcode.interface.rep";


export default interface IRepositoryFactory {
	createZipcodeRepository(): IZipcodeRepository;
}