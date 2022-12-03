import Customer from './customer.entity';
import OrderItem from './order-item.entity';

export default class Order {
  constructor(
    readonly customer: Customer,
    readonly orderItems: OrderItem[],
    readonly id?: string,
  ) { }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    return total;
  }
}