import 'jest-extended';
import { SuperTest, Test } from 'supertest';
import { FastifyInstance } from 'fastify';
import { startServer, stopServer, TEST_PROJECTS } from '../../helpers';

describe('PROJECTS / public', () => {
  const PROJECT = TEST_PROJECTS.project;
  let callAPI: SuperTest<Test>;
  let fastify: FastifyInstance;

  beforeAll(async () => {
    const { fastify: instance, request } = await startServer();
    fastify = instance;
    callAPI = request;
  });
  afterAll(() => stopServer(fastify));

  it('GET /projects', async () => {
    const { body: { projects } } = await callAPI
      .get('/projects')
      .query({ offset: 0, limit: 100 });
    projects.forEach(
      (obj: Object) => expect(obj).toMatchObject({
        urlKey: expect.any(String),
        title: expect.any(String),
        type: 'render',
        description: '',
      }),
    );
  });

  it('GET /projects/:projectId', async () => {
    const { body: { project } } = await callAPI
      .get(`/projects/${PROJECT.id}`);
    expect(project).toHaveProperty('id', PROJECT.id);
  });

  it('PUT /projects', async () => {

  });
});
