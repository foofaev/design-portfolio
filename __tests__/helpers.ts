/* ****************************************************************************************************************** */

import { FastifyInstance } from 'fastify';
import * as supertest from 'supertest';

import getServer from '../backend';
import Project, { ProjectOutput } from '../backend/entities/Project';
import User, { UserOutput } from '../backend/entities/User';

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
type TEST_PROJECTS_TYPE = {
  [key: string]: Partial<Project>;
};

/* ****************************************************************************************************************** */
const TEST_PROJECTS: TEST_PROJECTS_TYPE = {
  project: {
    id: '63cdd5f8-29dd-41c2-97d9-09c46fe4b9e8',
    title: 'testProject',
    type: 'render',
    isVisible: false,
  },
  otherProject: {
    id: '0f616b15-0b8e-4767-b2fa-243c0865cd1d',
    title: 'otherTestProject',
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
async function syncTestProjects(fastify: FastifyInstance): Promise<{ [key: string]: Project }> {
  const { projectRepository } = fastify;

  const project = await projectRepository
    .findOneOrFail(TEST_PROJECTS.project.id)
    .catch(() => projectRepository
      .save(TEST_PROJECTS.project)
      .then((instance) => projectRepository.generateUrlKey(instance, -1, true)));

  const otherProject = await projectRepository
    .findOneOrFail(TEST_PROJECTS.otherProject.id)
    .catch(() => projectRepository
      .save(TEST_PROJECTS.otherProject)
      .then((instance) => projectRepository.generateUrlKey(instance, -1, true)));

  return { project, otherProject };
}

/* ****************************************************************************************************************** */
async function getCookie(fastify: FastifyInstance, user: Partial<User>): Promise<string> {
  const authRes = await supertest(fastify.server)
    .put('/api/session')
    .send(user)
    .expect(200);
  return authRes.header['set-cookie'];
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
