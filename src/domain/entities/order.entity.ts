import Customer from './customer.entity';
import OrderItem from './order-item.entity';

export default class Order {
  constructor(
    readonly customer: Customer,
    readonly orderItems: OrderItem[],
    readonly id?: string,
  ) { }

  generateCode(sequence: number) {
    if (sequence < 0)
      throw new Error("Invalid sequence");

    const date = new Date();
    const year = date.getFullYear();
    return `${year}${new String(sequence).padStart(8, "0")}`;
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    return total;
  }
}