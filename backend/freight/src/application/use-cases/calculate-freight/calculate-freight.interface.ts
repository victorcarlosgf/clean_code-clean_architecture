import { CalculateFreightInput, CalculateFreightOutput } from "./calculate-freight.dto";

export default interface ICalculateFreight {
  execute(calculateFreightInput: CalculateFreightInput): Promise<CalculateFreightOutput>
}