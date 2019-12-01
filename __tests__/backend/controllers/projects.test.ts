import 'jest-extended';
import * as supertest from 'supertest';
import { FastifyInstance } from 'fastify';
import getServer from '../../../backend';
import { syncTestProjects } from '../../helpers';

describe('PROJECTS / public', () => {
  let fastify: FastifyInstance;
  let PROJECT: Object;
  let OTHER_PROJECT: Object;

  beforeAll(async () => {
    fastify = await getServer();
    const { project, otherProject } = await syncTestProjects(fastify);
    PROJECT = project;
    OTHER_PROJECT = otherProject;
  });
  afterAll(() => fastify.db.close());

  it('GET /projects', async () => {
    const { body: { projects } } = await supertest(fastify.server)
      .get('/projects')
      .expect(200);
    console.log(projects);
    // expect(projects).toIncludeAllMembers([PROJECT, OTHER_PROJECT]);
    projects.forEach(
      (obj: Object) => expect(obj).toMatchObject({
        urlKey: expect.any(String),
        title: expect.any(String),
        type: 'render',
        description: '',
      }),
    );
  });

  // it('GET 404', async () => {
  //   const res = await request.agent(server)
  //     .get('/wrong-path');
  //   expect(res).toHaveHTTPStatus(404);
  // });
});
