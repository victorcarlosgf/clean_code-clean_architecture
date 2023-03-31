import Coordinates from "./coordinates.entity";

export default class Freight {
  distance: number
  value: number

  constructor(
    readonly volume: number,
    readonly density: number
  ) {
    this.distance = 0;
    this.value = 0;
  }

  calculateValue(volume: number, density: number, distance: number = 1000) {
    const value = distance * volume * (density / 100);
    this.value = (value >= 10) ? Math.round(value * 100) / 100 : 10;
  }

  calculateDistance(from: Coordinates, to: Coordinates) {
    if (from.lat == to.lat && from.long == to.long) return 0;
    const radlat1 = (Math.PI * from.lat) / 180;
    const radlat2 = (Math.PI * to.lat) / 180;
    const theta = from.long - to.long;
    const radtheta = (Math.PI * theta) / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) dist = 1;
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    this.distance = dist * 1.609344; //convert miles to km
  }
}