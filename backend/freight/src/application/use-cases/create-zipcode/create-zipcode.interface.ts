import { CreateZipcodeInput, CreateZipcodeOutput } from "./create-zipcode.dto";

export default interface ICreateZipcode {
  execute(createZipcodeInput: CreateZipcodeInput): Promise<CreateZipcodeOutput>
}