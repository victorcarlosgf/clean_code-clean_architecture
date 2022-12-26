import { ValidateCouponInput, ValidateCouponOutput } from "./validate-coupon.dto";

export default interface IValidateCoupon {
  execute(couponInput: ValidateCouponInput): Promise<ValidateCouponOutput>
}