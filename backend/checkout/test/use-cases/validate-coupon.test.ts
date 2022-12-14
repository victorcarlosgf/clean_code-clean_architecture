import { ValidateCouponInput } from "../../src/application/use-cases/validate-coupon/validate-coupon.dto";
import ValidateCoupon from "../../src/application/use-cases/validate-coupon/validate-coupon.usecase";
import ICouponRepository from "../../src/domain/repository/coupon.interface.rep";

const validateCouponInput: ValidateCouponInput = {
	code: "VALE20",
	total: 1000
};

const coupon = {
	percentage: 20,
	expireDate: new Date(Date.now() + (3600 * 1000 * 24))
};

const couponRepository: ICouponRepository = {
	save: jest.fn().mockResolvedValue(null),
	findByCode: jest.fn().mockResolvedValue(coupon),
}

beforeAll(() => {
});

afterEach(() => {
	jest.clearAllMocks();
});

test("Deve validar um cupom de desconto", async function () {
	const validateCoupon = new ValidateCoupon(couponRepository);
	const output = await validateCoupon.execute(validateCouponInput);
	expect(output.isExpired).toBeFalsy();
	expect(output.discount).toBe(200);
});