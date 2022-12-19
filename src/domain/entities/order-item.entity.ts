import Product from "./product.entity";

export default class OrderItem {
  constructor(
    readonly product: Product,
    readonly quantity: number,
    readonly id?: string,
  ) {
    if (quantity <= 0) throw new Error("Quantity must be positive");
  }

  getTotal() {
    return this.product.getTotal() * this.quantity;
  }
}