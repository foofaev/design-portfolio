import { FastifyInstance } from 'fastify';
import { isEmpty } from 'lodash';
import Project from '../entities/Project';
import User from '../entities/User';

const processOne = (fastify: FastifyInstance, { image, previewImage, files: fileRefs, ...project }: Project) => {
  const { fileReferenceRepository } = fastify;
  const imageUrl = image ? fileReferenceRepository.generateExtendedURL(image, project) : '';
  const previewImageUrl = previewImage
    ? fileReferenceRepository.generateExtendedURL(previewImage, project)
    : '';
  const files = isEmpty(fileRefs)
    ? []
    : fileRefs.map((fileRef) => fileReferenceRepository.generateExtendedURL(fileRef, project));
  return { ...project, imageUrl, previewImageUrl, files };
};

export const projectsToJSON = (fastify: FastifyInstance, projects: Project | Project[]) => {
  if (!Array.isArray(projects)) return processOne(fastify, projects);
  return projects.map((project) => processOne(fastify, project));
};

export const userToJSON = (fastify: FastifyInstance, { image, password, ...user }: User) => {
  const { fileReferenceRepository } = fastify;
  const imageUrl = image ? fileReferenceRepository.generateExtendedURL(image, user) : '';
  return { ...user, imageUrl };
};
