import { CalculateFreightInput } from "../../src/application/use-cases/calculate-freight/calculate-freight.dto";
import IZipcodeRepository from "../../src/domain/repository/zipcode.interface.rep";
import Zipcode from "../../src/domain/entities/zipcode.entity";
import CalculateFreight from "../../src/application/use-cases/calculate-freight/calculate-freight.usecase";

const calculateFreightInput: CalculateFreightInput = {
  from: "22030060",
  to: "88015600",
  volume: 0.03,
  density: 100
}

const zipcodeFrom = new Zipcode("22030060", "", "", -27.5945, -48.5477);
const zipCodeTo = new Zipcode("88015600", "", "", -22.9129, -43.2003);

const zipcodeRepository: IZipcodeRepository = {
  save: jest.fn().mockResolvedValue(null),
  findByCode: jest.fn()
    .mockResolvedValueOnce(zipcodeFrom)
    .mockResolvedValueOnce(zipCodeTo),
}

beforeAll(() => {
});

afterEach(() => {
  jest.clearAllMocks();
});

test("Deve simular o frete para um pedido sem CEP de origem e destino", async function () {
  const calculateFreightInput: CalculateFreightInput = {
    volume: 0.03,
    density: 100
  };
  const calculateFreight = new CalculateFreight(zipcodeRepository);
  const output = await calculateFreight.execute(calculateFreightInput);
  expect(output.total).toBe(30);
});

test("Deve simular o frete para um pedido com CEP de origem e destino", async function () {
  const calculateFreight = new CalculateFreight(zipcodeRepository);
  const output = await calculateFreight.execute(calculateFreightInput);
  expect(output.total).toBe(22.45);
});