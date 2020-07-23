import * as path from 'path';
import { SuperTest, Test } from 'supertest';
import { FastifyInstance } from 'fastify';
import { startServer, stopServer, TEST_USERS, UserOutput } from '../../helpers';

type UserApiResult = {
  body: { user: UserOutput }
};

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
    const result: UserApiResult = await callAPI
      .get('/api/user')
      .set('Cookie', cookie)
      .expect(200);
    const { body: { user } } = result;
    expect(user).toMatchObject(match);
  });

  it('PATCH /user', async () => {
    const result: UserApiResult = await callAPI
      .patch('/api/user')
      .send({ firstName: 'new name' })
      .set('Cookie', cookie)
      .expect(200);
    expect(result.body.user).toHaveProperty('firstName', 'new name');
  });

  it('PATCH /user/password', () => callAPI
    .patch('/api/user')
    .send({ newPassword: 'abracadabra', oldPassword: 'passw0rd' }) // TODO
    .set('Cookie', cookie)
    .expect(200));

  it('PATCH /user/image', async () => {
    const result: UserApiResult = await callAPI
      .patch('/api/user/image')
      .attach('file', path.resolve('__tests__/slowpoke.jpg'))
      .set('Cookie', cookie)
      .expect(200);
    const { body: { user } } = result;

    expect(user.imageUrl).toBeString();

    await callAPI
      .get(user.imageUrl)
      .expect(200);
  });

  it('DELETE /user/image/', async () => {
    const result: UserApiResult = await callAPI
      .delete('/api/user/image')
      .set('Cookie', cookie)
      .expect(200);

    expect(result.body.user).toHaveProperty('imageUrl', '');
  });
});
