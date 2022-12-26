import axios from 'axios';

axios.defaults.validateStatus = function () {
  return true;
}

test('Deve verificar api esta ON', async () => {
  const response = await axios.get(`http://localhost:${80}/healthcheck`);
  expect(response.data).toBe('OK');
  expect(response.status).toBe(200);
});

