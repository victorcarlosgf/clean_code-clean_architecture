import axios from 'axios';
import Client from '../src/entities/client.entity';
import Product from '../src/entities/product.entity';
import CreateClient from '../src/use-case/client/create-client/create-client';

test('Deve verificar api esta ON', async () => {
  const response = await axios.get('http://localhost:3000/healthcheck');
  expect(response.data).toBe('OK');
  expect(response.status).toBe(200);
});

