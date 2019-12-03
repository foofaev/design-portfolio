import 'jest-extended';
import * as supertest from 'supertest';
import * as _ from 'lodash';
import { FastifyInstance } from 'fastify';
import getServer from '../../../backend';
import { syncTestProjects } from '../../helpers';

describe('PROJECTS / public', () => {
  let fastify: FastifyInstance;
  let PROJECT: Object;

  beforeAll(async () => {
    fastify = await getServer();
    const { project } = await syncTestProjects(fastify);
    PROJECT = project;
  });
  afterAll(() => fastify.db.close());

  it('GET /projects', async () => {
    const { body: { projects } } = await supertest(fastify.server)
      .get('/projects')
      .query({ offset: 0, limit: 100 })
      .expect(200);
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
    const { body: { project } } = await supertest(fastify.server)
      .get(`/projects/${_.get(PROJECT, 'id')}`)
      .expect(200);
    expect(project).toHaveProperty('id', _.get(PROJECT, 'id'));
  });

  // it('GET 404', async () => {
  //   const res = await request.agent(server)
  //     .get('/wrong-path');
  //   expect(res).toHaveHTTPStatus(404);
  // });
});
