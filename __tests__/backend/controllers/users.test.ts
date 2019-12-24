import * as path from 'path';
import { SuperTest, Test } from 'supertest';
import { FastifyInstance } from 'fastify';
import { startServer, stopServer, TEST_USERS } from '../../helpers';

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
  afterAll(async () => {
    await fastify.userRepository.update(TEST_USERS.administrator.id, TEST_USERS.administrator);
    await stopServer(fastify);
  });

  it('GET /user', async () => {
    const { password, ...match } = TEST_USERS.administrator;
    const { body: { user } } = await callAPI
      .get('/user')
      .set('Cookie', cookie)
      .expect(200);
    expect(user).toMatchObject(match);
  });

  it('PATCH /user', async () => {
    const { body: { user } } = await callAPI
      .patch('/user')
      .send({ firstName: 'new name' })
      .set('Cookie', cookie)
      .expect(200);
    expect(user).toHaveProperty('firstName', 'new name');
  });

  it('PATCH /user/password', () => callAPI
    .patch('/user')
    .send({ password: 'abracadabra' })
    .set('Cookie', cookie)
    .expect(200));

  it('PATCH /user/image', async () => {
    const { body: { user } } = await callAPI
      .patch('/user/image')
      .attach('file', path.resolve('__tests__/slowpoke.jpg'))
      .set('Cookie', cookie)
      .expect(200);

    expect(user.imageUrl).toBeString();

    await callAPI
      .get(user.imageUrl)
      .expect(200);
  });

  it('DELETE /user/image/', async () => {
    const { body: { user } } = await callAPI
      .delete('/user/image')
      .set('Cookie', cookie)
      .expect(200);

    expect(user).toHaveProperty('imageUrl', '');
  });
});
