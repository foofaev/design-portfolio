import { FastifyInstance } from 'fastify';
import * as _ from 'lodash';
import Project from '../entities/Project';
import User from '../entities/User';

const processOne = (fastify: FastifyInstance, { image, files: fileRefs, ...project }: Project) => {
  const { fileReferenceRepository } = fastify;

  const imageId = _.get(image, 'id', '');
  const imageUrl = image ? fileReferenceRepository.generateExtendedURL(image, project) : '';

  const files = _.map(
    _.orderBy(fileRefs, ['ord'], ['desc']),
    (fileRef) => ({
      ..._.pick(fileRef, ['id', 'num', 'filePath', 'ord', 'contentType']),
      url: fileReferenceRepository.generateExtendedURL(fileRef, project),
    }),
  );

  const images = _.map(files, 'url');

  return { ...project, imageUrl, imageId, files, images };
};

const projectsToJSON = (fastify: FastifyInstance, projects: Project | Project[]) => {
  if (!Array.isArray(projects)) return processOne(fastify, projects);
  return projects.map((project) => processOne(fastify, project));
};

const userToJSON = (fastify: FastifyInstance, { image, password, ...user }: User) => {
  const { fileReferenceRepository } = fastify;
  const imageUrl = image ? fileReferenceRepository.generateExtendedURL(image, user) : '';
  return { ...user, imageUrl };
};

export {
  projectsToJSON,
  userToJSON,
};
