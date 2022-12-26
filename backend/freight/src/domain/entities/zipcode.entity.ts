import Coordinates from "./coordinates.entity";

export default class Zipcode {
  coordinates: Coordinates;

  constructor(
    readonly code: string,
    readonly street: string,
    readonly neighborhood: string,
    readonly lat: number,
    readonly long: number) {
    this.coordinates = new Coordinates(lat, long);
  }
}