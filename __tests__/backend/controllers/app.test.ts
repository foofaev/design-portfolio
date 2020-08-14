import { SuperTest, Test } from 'supertest';
import { FastifyInstance } from 'fastify';
import { startServer, stopServer } from '../../helpers';

describe('basic routes', () => {
  let callAPI: SuperTest<Test>;
  let fastify: FastifyInstance;

  beforeAll(async () => {
    const { fastify: instance, request } = await startServer();
    fastify = instance;
    callAPI = request;
  });
  afterAll(() => stopServer(fastify));

  it('GET /status', async () => {
    await callAPI
      .get('/status')
      .expect(200)
      .expect('OK');
  });

  it('GET 404', async () => {
    await callAPI
      .get('/wrong-path')
      .expect(404);
  });
});
