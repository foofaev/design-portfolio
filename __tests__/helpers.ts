/// <reference path="../@types/fastify.d.ts" />
/* ****************************************************************************************************************** */

import { FastifyInstance } from 'fastify';
import supertest from 'supertest';

import getServer from '../backend';
import Project, { ProjectOutput, ProjectType } from '../backend/entities/Project';
import User, { UserOutput } from '../backend/entities/User';
import { projectsToJSON } from '../backend/libs/toJSON';

/* ****************************************************************************************************************** */
/* TODO:
  - move fixtures to separate file
  - run tests in transaction
  - TestProject type is just project input type, remove
  - these helpers for backend only
*/
/* ****************************************************************************************************************** */

const TEST_USERS = {
  administrator: {
    id: '2d1a3d6b-0281-4262-94f3-e86b4fbb00ae',
    email: 'admin@tt.com',
    firstName: 'test',
    lastName: 'administrator',
    password: 'passw0rd',
  },
};

/* ****************************************************************************************************************** */
type TestProject = Partial<ProjectOutput> & {
    id: string;
    title: string;
    urlKey: string;
    type: ProjectType;
    isVisible: boolean;
};
type TestProjects = {
  [key: string]: TestProject;
};

/* ****************************************************************************************************************** */
const TEST_PROJECTS: TestProjects = {
  project: {
    id: '63cdd5f8-29dd-41c2-97d9-09c46fe4b9e8',
    title: 'testProject',
    urlKey: 'testProject-1',
    type: 'render',
    isVisible: false,
  },
  otherProject: {
    id: '0f616b15-0b8e-4767-b2fa-243c0865cd1d',
    title: 'otherTestProject',
    urlKey: 'testProject-2',
    type: 'render',
    isVisible: false,
  },
};

/* ****************************************************************************************************************** */
async function syncTestUser(fastify: FastifyInstance): Promise<User> {
  const { userRepository } = fastify;
  const admin = await userRepository.findOne(TEST_USERS.administrator.id);
  return userRepository.save({ ...admin, ...TEST_USERS.administrator });
}

/* ****************************************************************************************************************** */
async function syncTestProjects(fastify: FastifyInstance): Promise<{ [key: string]: ProjectOutput }> {
  const { projectRepository } = fastify;

  const project: ProjectOutput = await projectRepository
    .findOneOrFail(TEST_PROJECTS.project.id)
    .then((instance) => projectsToJSON(fastify, instance))
    .catch(() => projectRepository
      .save(TEST_PROJECTS.project as Partial<Project>)
      .then((instance: Project) => projectRepository.generateUrlKey(instance, -1, true))
      .then((instance: Project) => projectsToJSON(fastify, instance)));

  const otherProject: ProjectOutput = await projectRepository
    .findOneOrFail(TEST_PROJECTS.otherProject.id)
    .then((instance) => projectsToJSON(fastify, instance))
    .catch(() => projectRepository
      .save(TEST_PROJECTS.otherProject as Partial<Project>)
      .then((instance: Project) => projectRepository.generateUrlKey(instance, -1, true))
      .then((instance: Project) => projectsToJSON(fastify, instance)));

  return { project, otherProject };
}

/* ****************************************************************************************************************** */
async function getCookie(fastify: FastifyInstance, user: Partial<User>): Promise<string> {
  const authRes = await supertest(fastify.server)
    .put('/api/session')
    .send(user)
    .expect(204);
  // TODO:
  return authRes.header['set-cookie']; // eslint-disable-line
}

/* ****************************************************************************************************************** */
type TestContainer = {
  fastify: FastifyInstance;
  session: string;
  request: supertest.SuperTest<supertest.Test>;
};

/* ****************************************************************************************************************** */
async function startServer(): Promise<TestContainer> {
  const fastify = await getServer();
  await syncTestUser(fastify);
  const { project, otherProject } = await syncTestProjects(fastify);
  TEST_PROJECTS.project = project;
  TEST_PROJECTS.otherProject = otherProject;
  const session = await getCookie(fastify, { email: 'admin@tt.com', password: 'passw0rd' });

  return { fastify, session, request: supertest(fastify.server) };
}

/* ****************************************************************************************************************** */
async function stopServer(fastify: FastifyInstance): Promise<void> {
  return fastify.close();
}

/* ****************************************************************************************************************** */
export {
  syncTestUser,
  syncTestProjects,
  getCookie,
  startServer,
  stopServer,
  TEST_PROJECTS,
  TEST_USERS,
  Project,
  ProjectOutput,
  UserOutput,
};

/* ****************************************************************************************************************** */
