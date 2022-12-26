import ICurrencyGateway from "./currency.gateway.interface";

export default class CurrencyRandomGateway implements ICurrencyGateway {
  async getCurrencies() {
    return {
      "USD": 3 + Math.random(),
      "BRL": 1
    };
  }
}