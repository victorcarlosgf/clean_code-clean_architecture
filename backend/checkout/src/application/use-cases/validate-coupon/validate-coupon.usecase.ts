import Coupon from "../../../domain/entities/coupon.entity";
import ICouponRepository from "../../../domain/repository/coupon.interface.rep";
import { ValidateCouponInput, ValidateCouponOutput } from "./validate-coupon.dto";

export default class ValidateCoupon {

  constructor(readonly couponRepository: ICouponRepository) {
  }

  async execute(input: ValidateCouponInput): Promise<ValidateCouponOutput> {
    const couponFound = await this.couponRepository.findByCode(input.code);
    const coupon = new Coupon(
      couponFound.code,
      couponFound.percentage,
      couponFound.expireDate
    );

    return {
      isExpired: coupon.isExpired(),
      discount: coupon.getDiscount(input.total)
    }
  }
}