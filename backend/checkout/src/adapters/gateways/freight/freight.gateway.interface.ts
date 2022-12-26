export default interface IFreightGateway {
  calculateFreight(volume: number, density: number, from?: string, to?: string): Promise<number>;
}