import Coupon from "../entities/coupon.entity";

export default interface ICouponRepository {
  save(coupon: Coupon): Promise<any>;
  findByCode(couponCode: string): Promise<any>;
}