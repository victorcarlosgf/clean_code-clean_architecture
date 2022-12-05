import CreateCustomer from "../src/application/use-case/customer/create-customer/create-customer.usecase";
import DBRepositoryFactory from "../src/infra/db/repository/repository-factory";

const customersInput = [{
  name: 'Victor Freitas',
  document: '36998272162',
}, {
  name: 'Victor Freitas',
  document: '22504797710',
}];

const customerWithInvalidDocument = {
  name: 'Victor Freitas',
  document: '36998272160',
};

test.each(customersInput)('Deve validar documento do cliente %', async (customerInput: any) => {
  const repositoryFactory = new DBRepositoryFactory();
  const createCustomer = new CreateCustomer(repositoryFactory);
  const response = await createCustomer.execute(customerInput);
  expect(response.status).toBe(201);
});

test('Deve retornar cliente com documento inválido', async () => {
  const repositoryFactory = new DBRepositoryFactory();
  const createCustomer = new CreateCustomer(repositoryFactory);
  expect(() => createCustomer.execute(customerWithInvalidDocument))
    .rejects
    .toThrow(new Error('Document invalid'));
});

test('Deve criar cliente', async () => {
  const repositoryFactory = new DBRepositoryFactory();
  const createCustomer = new CreateCustomer(repositoryFactory);
  const response = await createCustomer.execute(customersInput[0]);
  expect(response.status).toBe(201);
});