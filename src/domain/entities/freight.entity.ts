import Coordinates from "./coordinates.entity";
import OrderItem from "./order-item.entity";

export default class Freight {
  private freigth: number
  constructor() {
    this.freigth = 0;
  }

  calculate(orderItems: OrderItem[]) {
    for (const orderItem of orderItems) {
      const volume = (orderItem.product.dimension.width / 100)
        * (orderItem.product.dimension.height / 100)
        * (orderItem.product.dimension.length / 100);
      const density = orderItem.product.weight / volume;
      const itemFreight = 1000 * volume * (density / 100) * orderItem.quantity;
      this.freigth += (itemFreight >= 10) ? itemFreight : 10;
    }

    return this.freigth;
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
    dist = dist * 1.609344; //convert miles to km
    return dist;
  }
}