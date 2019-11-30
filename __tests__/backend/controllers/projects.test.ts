import * as supertest from 'supertest';
import { FastifyInstance } from 'fastify';
import getServer from '../../../backend';

describe('basic routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = await getServer();
    // await fastify.db.synchronize();
  });
  afterAll(() => fastify.close());

  it('GET /', async () => {
    const res = await supertest(fastify.server)
      .get('/status')
      .expect(200);
    expect(res.text).toBe('OK');
  });
  it('GET /projects', async () => {
    await supertest(fastify.server)
      .get('/projects')
      .expect(200);
  });

  // it('GET 404', async () => {
  //   const res = await request.agent(server)
  //     .get('/wrong-path');
  //   expect(res).toHaveHTTPStatus(404);
  // });
});
