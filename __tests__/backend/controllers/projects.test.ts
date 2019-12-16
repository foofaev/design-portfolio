import 'jest-extended';
import * as path from 'path';
import * as _ from 'lodash';
import { SuperTest, Test } from 'supertest';
import { FastifyInstance } from 'fastify';
import { startServer, stopServer, TEST_PROJECTS, Project } from '../../helpers';

let newProject: Partial<Project> = {
  title: 'newProject',
  description: 'new long description about ptoject',
  type: 'render',
  isVisible: false,
};

describe('PROJECTS / public', () => {
  const PROJECT = TEST_PROJECTS.project;
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

  it('GET /projects', async () => {
    const { body: { projects } } = await callAPI
      .get('/projects')
      .query({ offset: 0, limit: 100 });
    projects.forEach(
      (obj: Project) => {
        expect(obj.urlKey).toBeString();
        expect(obj.title).toBeString();
        expect(obj.description).toBeString();
        expect(obj.type).toEqual('render');
      },
    );
  });

  it('GET /projects/:projectId', async () => {
    const { body: { project } } = await callAPI
      .get(`/projects/${PROJECT.id}`);
    expect(project).toHaveProperty('id', PROJECT.id);
  });

  it('PUT /projects returns error without session', async () => {
    const res = await callAPI
      .put('/projects')
      .send(newProject)
      .expect(401);
    expect(res.body.message).toEqual('Session missing');
  });

  it('PUT /projects', async () => {
    const { body: { project } } = await callAPI
      .put('/projects')
      .send(newProject)
      .set('Cookie', cookie)
      .expect(200);
    expect(project).toMatchObject(newProject);

    newProject = project;
  });

  it('PATCH /projects/:id - set title', async () => {
    const { body: { project } } = await callAPI
      .patch(`/projects/${newProject.id}`)
      .send({ title: 'updated title' })
      .set('Cookie', cookie)
      .expect(200);
    expect(project).toHaveProperty('title', 'updated title');

    newProject = project;
  });

  it('PATCH /projects/:id - set ord', async () => {
    const { body: { project } } = await callAPI
      .patch(`/projects/${newProject.id}`)
      .send({ ord: 100 })
      .set('Cookie', cookie)
      .expect(200);
    expect(project).toHaveProperty('ord', 100);

    newProject = project;
  });

  it('PATCH /projects/image/:id - save image', async () => {
    const { body: { project } } = await callAPI
      .patch(`/projects/image/${newProject.id}`)
      .field('ord', 100)
      .attach('file', path.resolve('__tests__/slowpoke.jpg'))
      .set('Cookie', cookie)
      .expect(200);

    expect(project.imageUrl).toBeString();

    await callAPI
      .get(project.imageUrl)
      .expect(200);

    await callAPI
      .get(project.imageUrl)
      .query({ width: 200, height: 180 })
      .expect(200);

    newProject = project;
  });

  it('PATCH /projects/image/:id - save another image', async () => {
    const { body: { project } } = await callAPI
      .patch(`/projects/image/${newProject.id}`)
      .field('ord', 50)
      .attach('file', path.resolve('__tests__/other_slowpoke.png'))
      .set('Cookie', cookie)
      .expect(200);

    expect(project.imageUrl).toBeString();
    expect(project.files).toBeArrayOfSize(2);
    expect(project.images).toBeArrayOfSize(2);

    await callAPI
      .get(project.images[0])
      .expect(200);

    await callAPI
      .get(project.images[1])
      .expect(200);

    console.log(1, project);
    newProject = project;
  });

  it('PATCH /projects/image/:id/fileId', async () => {
    const { body: { project } } = await callAPI
      .patch(`/projects/image/${newProject.id}/${_.get(newProject, 'files.1.id')}`)
      .send({ ord: 200 })
      .set('Cookie', cookie)
      .expect(200);

    console.log('PROJECT', project);

    expect(project.imageUrl).toBeString();
    expect(project.imageUrl).not.toEqual(newProject.imageUrl);

    newProject = project;
  });
});
