import { FastifyInstance } from 'fastify';
import Project from '../backend/entities/Project';

const TEST_USERS = {
  administrator: {
    id: '2d1a3d6b-0281-4262-94f3-e86b4fbb00ae',
    firstName: 'test',
    lastName: 'administrator',
    password: 'some_secret_password',
  },
};

type TEST_PROJECTS_TYPE = {
  [key: string]: Partial<Project>,
};

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

export const syncTestUser = (fastify: FastifyInstance) => {
  const { userRepository } = fastify;
  return userRepository.save(TEST_USERS.administrator);
};

export const syncTestProjects = async (fastify: FastifyInstance) => {
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
};
