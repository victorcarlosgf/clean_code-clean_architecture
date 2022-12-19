import { CreateCustomerInput } from "../../src/application/use-cases/customer/create-customer/create-customer.dto";
import CreateCustomer from "../../src/application/use-cases/customer/create-customer/create-customer.usecase";
import CustomerDBRepository from "../../src/infra/driven/repository/db/model/customer.db.rep";

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

test('Deve retornar cliente com documento inválido', async () => {
  const customerRepository = new CustomerDBRepository();
  const createCustomer = new CreateCustomer(customerRepository);
  expect(() => createCustomer.execute(createCustomerInvalidDocumentInput))
    .rejects
    .toThrow(new Error('Document invalid'));
});

test('Deve criar cliente', async () => {
  const customerRepository = new CustomerDBRepository();
  const createCustomer = new CreateCustomer(customerRepository);
  const response = await createCustomer.execute(createCustomerInput);
  expect(response.status).toBe(201);
});