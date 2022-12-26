export type ValidateCouponInput = {
  code: string,
  total: number
}

export type ValidateCouponOutput = {
  isExpired: boolean,
  discount: number
}
