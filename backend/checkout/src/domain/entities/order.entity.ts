import Coupon from './coupon.entity';
import Customer from './customer.entity';
import OrderItem from './order-item.entity';

export default class Order {
  private orderItems: OrderItem[]
  private freight: number
  private coupon?: Coupon
  constructor(
    readonly customer: Customer,
    readonly id?: string,
  ) {
    this.orderItems = [];
    this.freight = 0;
  }

  generateCode(sequence: number) {
    if (sequence < 0)
      throw new Error("Invalid sequence");

    const date = new Date();
    const year = date.getFullYear();
    return `${year}${new String(sequence).padStart(8, "0")}`;
  }

  addItem(orderItem: OrderItem) {
    if (this.orderItems.some((item) => item.product.id === orderItem.product.id)) throw new Error("Duplicated product");
    this.orderItems.push(orderItem);
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired()) {
      this.coupon = coupon;
    }
  }

  getVolume(): number {
    let volume = 0;
    for (const orderItem of this.orderItems) {
      volume += orderItem.getVolume();
    }
    return volume;
  }

  getDensity(): number {
    let density = 0;
    for (const orderItem of this.orderItems) {
      density += orderItem.getDensity();
    }
    return density;
  }

  setFreight(freight: number) {
    this.freight = freight;
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if (this.coupon) {
			total -= this.coupon.getDiscount(total);
		}
		total += this.freight;
    return total;
  }
}