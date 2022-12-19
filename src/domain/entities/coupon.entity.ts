export default class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expireDate: Date,
    readonly id?: string,
  ) { }

  isExpired() {
    const today = new Date();
    return this.expireDate.getTime() < today.getTime();
  }

  getDiscount(total: number) {
    return (total * this.percentage) / 100;
  }
}