import { SuperTest, Test } from 'supertest';
import { FastifyInstance } from 'fastify';
import { startServer, stopServer } from '../../helpers';

describe('USER / Private', () => {
  let callAPI: SuperTest<Test>;
  let fastify: FastifyInstance;
  let cookie: string;

  beforeAll(async () => {
    const { fastify: instance, request, session } = await startServer();
    fastify = instance;
    callAPI = request;
    cookie = session;
  });
  afterAll(() => stopServer(fastify));

  it('GET /user', async () => {
    const { body: { user } } = await callAPI
      .get('/user')
      .set('cookie', cookie)
      .expect(200);
    console.log(user);
  });
});
