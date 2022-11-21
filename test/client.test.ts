import Client from "../src/entities/client.entity";
import ClientRepository from "../src/infra/repository/client.rep";
import CreateClient from "../src/use-case/client/create-client/create-client";

test('Deve criar cliente', async () => {
  const clientInput = {
    id: '9ea1a924-a010-4bc9-b29b-52273d12cd5a',
    name: 'Victor Freitas',
    document: '36998272162',
    createdAt: '2022-11-19T18:51:48.590Z'
  };

  const client = new Client(clientInput.name, clientInput.document);
  const clientRepository = new ClientRepository();

  const createClient = new CreateClient(clientRepository);
  const response = await createClient.execute(clientInput);
  // expect(response.data).toStrictEqual(client);
  expect(response.status).toBe(201);
});