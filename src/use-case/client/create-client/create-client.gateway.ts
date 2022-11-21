import { createClientInput } from "./create-client.dto";

export default interface ICreateClient {
  execute(clientInput: createClientInput): Promise<any>
}