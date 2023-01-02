import Coupon from './coupon.entity';
import Customer from './customer.entity';
import OrderItem from './order-item.entity';

export default class Order {
  private code: string;
  private orderItems: OrderItem[];
  private freight: number;
  private coupon?: Coupon;
  constructor(
    readonly customer: Customer,
    readonly id?: string,
  ) {
    this.code = '';
    this.orderItems = [];
    this.freight = 0;
  }

  generateCode(sequence: number) {
    if (sequence < 0)
      throw new Error('Invalid sequence');

    const date = new Date();
    const year = date.getFullYear();
    this.code = `${year}${new String(sequence).padStart(8, '0')}`;
    return this.code;
  }

  addItem(orderItem: OrderItem) {
    if (this.orderItems.some((item) => item.product.id === orderItem.product.id)) throw new Error('Duplicated product');
    this.orderItems.push(orderItem);
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired()) {
      this.coupon = coupon;
    }
  }

  getCode(): string {
    return this.code;
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