import { CreateCustomerInput } from "../../src/application/use-cases/customer/create-customer/create-customer.dto";
import CreateCustomer from "../../src/application/use-cases/customer/create-customer/create-customer.usecase";
import ICustomerRepository from "../../src/domain/repository/customer.interface.rep";

const createCustomerInput = {
  name: 'Batman',
  document: '36998272162',
  email: 'batman@gmail.com'
};

const createCustomerInvalidDocumentInput: CreateCustomerInput = {
  name: 'Batman',
  document: '36998272160',
  email: 'batman@gmail.com'
};

const customerCreated = {
  id: '1',
  name: 'Batman',
  document: '36998272162',
  email: 'batman@gmail.com',
  createdAt: new Date()
};

const customerRepository: ICustomerRepository = {
  save: jest.fn().mockResolvedValue(customerCreated),
  findByDocument: jest.fn(),
}

beforeAll(() => {
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('CreateCustomer', () => {
  test('Deve retornar cliente com documento inválido', async () => {
    const createCustomer = new CreateCustomer(customerRepository);
    expect(() => createCustomer.execute(createCustomerInvalidDocumentInput))
      .rejects
      .toThrow(new Error('Document invalid'));
  });

  test('Deve criar cliente', async () => {
    const createCustomer = new CreateCustomer(customerRepository);
    const response = await createCustomer.execute(createCustomerInput);
    expect(response.status).toBe(201);
  });
});