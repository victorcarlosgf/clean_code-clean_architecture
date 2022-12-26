import IFreightGateway from "./freight.gateway.interface";
import axios from "axios";

export default class FreightApiGateway implements IFreightGateway {
  async calculateFreight(volume: number, density: number, from?: string, to?: string): Promise<number> {
    const response = await axios.post("http://localhost:3003/calculate", { from, to, volume, density });
    return response.data;
  }
}