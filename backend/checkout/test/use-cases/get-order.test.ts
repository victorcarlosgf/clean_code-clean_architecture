import { GetOrderInput } from "../../src/application/use-cases/order/get-order/get-order.dto";
import GetOrder from "../../src/application/use-cases/order/get-order/get-order.usecase";
import IOrderRepository from "../../src/domain/repository/order.interface.rep";

const orderFound = {
	total: 6350
};

const orderRepository: IOrderRepository = {
	save: jest.fn().mockResolvedValue(null),
	findByCode: jest.fn().mockResolvedValue(orderFound),
	findByDocument: jest.fn().mockResolvedValue(orderFound),
}

beforeAll(() => {
});

afterEach(() => {
	jest.clearAllMocks();
});

describe('GetOrder', () => {

	test("Deve consultar os pedidos de um cliente", async function () {
		const getOrderInput: GetOrderInput = {
			document: "987.654.321-00"
		};
		const getOrder = new GetOrder(orderRepository);
		const response = await getOrder.execute(getOrderInput);
		expect(response.total).toBe(6350);
	});

	test("Deve consultar o pedido pelo codigo", async function () {
		const getOrderInput: GetOrderInput = {
			code: "202200000001"
		};
		const getOrder = new GetOrder(orderRepository);
		const response = await getOrder.execute(getOrderInput);
		expect(response.total).toBe(6350);
	});
});