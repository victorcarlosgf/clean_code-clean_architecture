import Product from "./product.entity";

export default class OrderItem {
  constructor(
    readonly product: Product,
    readonly quantity: number,
    readonly id?: string,
  ) { }

  getTotal() {
    return this.product.value * this.quantity;
  }
}