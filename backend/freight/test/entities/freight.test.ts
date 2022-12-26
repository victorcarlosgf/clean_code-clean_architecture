import Coordinates from "../../src/domain/entities/coordinates.entity";
import Freight from "../../src/domain/entities/freight.entity";

test("Deve calcular o frete com distância padrão", function () {
  const freight = new Freight();
  const total = freight.calculateValue(0.03, 100);
  expect(total).toBe(30);
});

test("Deve calcular o frete com distância padrão", function () {
  const freight = new Freight();
  const total = freight.calculateValue(0.125, 176);
  expect(total).toBe(220);
});

test("Deve calcular o frete mínimo", function () {
  const freight = new Freight();
  const total = freight.calculateValue(0.01, 100);
  expect(total).toBe(10);
});

test("Deve calcular o frete com distância variável", function () {
  const freight = new Freight();
  const distance = 748.2217780081631;
  const total = freight.calculateValue(0.03, 100, distance);
  expect(total).toBe(22.45);
});

test("Deve calcular a distância entre duas coordenadas", function () {
  const from = new Coordinates(-27.5945, -48.5477);
  const to = new Coordinates(-22.9129, -43.2003);
  const freight = new Freight();
  const distance = freight.calculateDistance(from, to);
  expect(distance).toBe(748.2217780081631);
});