import Coordinates from "../../src/domain/entities/coordinates.entity";
import Freight from "../../src/domain/entities/freight.entity";
import OrderItem from "../../src/domain/entities/order-item.entity";
import Product from "../../src/domain/entities/product.entity";

test("Deve calcular o frete", function () {
	const productDimension = {
		width: 100,
		height: 30,
		length: 10,
	};
	const product = new Product('mug', 'mug batman', productDimension, 3, 20);
	const orderItem = new OrderItem(product, 1);
	const freigth = new Freight();
	const freigthValue = freigth.calculate([orderItem]);
	expect(freigthValue).toBe(30);
});

test("Deve calcular o frete mínimo", function () {
	const productDimension = {
		width: 10,
		height: 10,
		length: 10,
	};
	const product = new Product('mug', 'mug batman', productDimension, 0.9, 20);
	const orderItem = new OrderItem(product, 1);
	const freigth = new Freight();
	const freigthValue = freigth.calculate([orderItem]);
	expect(freigthValue).toBe(10);
});

test("Deve calcular a distância entre duas coordenadas", function () {
	const productDimension = {
		width: 10,
		height: 10,
		length: 10,
	};
	const product = new Product('mug', 'mug batman', productDimension, 0.9, 20);
	const orderItem = new OrderItem(product, 1);
	const to = new Coordinates(-27.5945, -48.5477);
	const from = new Coordinates(-22.9129, -43.2003);
	const freight = new Freight();
	const distance = freight.calculateDistance(from, to);
	expect(distance).toBe(748.2217780081631);
});