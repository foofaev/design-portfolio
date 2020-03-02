import { FastifyInstance } from 'fastify';
import * as _ from 'lodash';
import Project from '../entities/Project';
import User from '../entities/User';

const userToJSON = (fastify: FastifyInstance, { image, password, ...user }: User) => {
  const { fileReferenceRepository } = fastify;
  const imageUrl = image ? fileReferenceRepository.generateExtendedURL(image, user) : '';
  return { ...user, imageUrl };
};

export {
  projectsToJSON,
  userToJSON,
};
