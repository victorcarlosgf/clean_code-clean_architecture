import { SimulateFreightInput, SimulateFreightOutput } from "./simulate-freight.dto";

export default interface ISimulateFreight {
  execute(freightInput: SimulateFreightInput): Promise<SimulateFreightOutput>
}