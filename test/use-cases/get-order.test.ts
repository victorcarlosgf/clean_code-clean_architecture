import { GetOrderInput } from "../../src/application/use-cases/order/get-order/get-order.dto";
import GetOrder from "../../src/application/use-cases/order/get-order/get-order.usecase";
import IOrderRepository from "../../src/domain/repository/order.interface.rep";

test("Deve consultar os pedidos de um cliente", async function () {
	const orderRepository: IOrderRepository = {
		async save(order: any): Promise<void> {
		},
		async findByCode(): Promise<any> { },
		async findByDocument(document: string): Promise<any> {
			const order = {
				total: 6350
			};
			return order;
		}
	}
	const getOrderInput: GetOrderInput = {
		document: "987.654.321-00"
	};
	const getOrder = new GetOrder(orderRepository);
	const response = await getOrder.execute(getOrderInput);
	expect(response.total).toBe(6350);
});

test("Deve consultar o pedido pelo codigo", async function () {
	const orderRepository: IOrderRepository = {
		async save(): Promise<void> { },
		async findByCode(): Promise<any> {
			const order = {
				total: 6350
			};
			return order;
		},
		async findByDocument(document: string): Promise<any> { }
	}
	const getOrderInput: GetOrderInput = {
		code: "202200000001"
	};
	const getOrder = new GetOrder(orderRepository);
	const response = await getOrder.execute(getOrderInput);
	expect(response.total).toBe(6350);
});