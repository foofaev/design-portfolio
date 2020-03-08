/* ****************************************************************************************************************** */
import { FastifyInstance, FastifyRequest, DefaultQuery, DefaultHeaders } from 'fastify';
import { projectsToJSON } from '../libs/toJSON';
import ProjectDTO from '../dtos/ProjectDTO';
/* ****************************************************************************************************************** */

/* ****************************************************************************************************************** */
type Params = { projectId: string };

/* ****************************************************************************************************************** */
export default (fastify: FastifyInstance): FastifyInstance => fastify
  .route({
    method: 'PATCH',
    url: '/api/projects/image/:projectId',
    schema: {
      body: {
        type: 'object',
        properties: {
          ord: { type: 'integer' },
          file: { type: 'array', items: 'rawFileSchema#' },
        },
        required: ['file', 'ord'],
        additionalProperties: false,
      },
      params: {
        type: 'object',
        properties: {
          projectId: { type: 'string', minLength: 1 },
        },
        additionalProperties: false,
        required: ['projectId'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            project: 'projectOutput#',
          },
          additionalProperties: false,
        },
      },
    },
    preHandler: fastify.checkSession(true),
    handler: async (request) => {
      const { projectRepository, fileRepository, fileReferenceRepository } = fastify;
      const { body, params: { projectId } } = request;
      const rawFile = body.file[0];
      const fileData = { name: rawFile.filename, contentType: rawFile.mimetype, data: rawFile.data };

      const [project, file] = await Promise.all([
        projectRepository.findOneOrFail(projectId),
        fileRepository.createFromFileIfNotExists(fileData),
      ]);

      await fileReferenceRepository.createWithFile(
        file,
        { item: project, itemType: 'project', purpose: 'file', ord: body.ord },
      );

      await projectRepository.updateMainImageId(fastify, project);

      return projectRepository
        .findOneOrFail(projectId, { relations: ['image', 'files'] })
        .then((projects) => projectsToJSON(fastify, projects))
        .then((projectWithImage) => ({ project: projectWithImage }));
    },
  })
  .route({
    method: 'PATCH',
    url: '/api/projects/image/:projectId/:fileId',
    schema: {
      body: {
        type: 'object',
        properties: {
          ord: { type: 'integer' },
        },
        required: ['ord'],
        additionalProperties: false,
      },
      params: {
        type: 'object',
        properties: {
          projectId: { type: 'string', format: 'uuid' },
          fileId: { type: 'string', format: 'uuid' },
        },
        additionalProperties: false,
        required: ['projectId', 'fileId'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            project: 'projectOutput#',
          },
          additionalProperties: false,
        },
      },
    },
    preHandler: fastify.checkSession(true),
    handler: async (request) => {
      const { projectRepository, fileReferenceRepository } = fastify;
      const { body: { ord }, params: { projectId, fileId } } = request;

      const project = await projectRepository.findOneOrFail(projectId);

      await fileReferenceRepository.update(fileId, { ord });
      await projectRepository.updateMainImageId(fastify, project);

      const updated = await projectRepository
        .findOneOrFail(projectId, { relations: ['image', 'files'] })
        .then((projects) => projectsToJSON(fastify, projects));

      return { project: updated };
    },
  })
  .route({
    method: 'DELETE',
    url: '/api/projects/image/:projectId/:fileId',
    schema: {
      params: {
        type: 'object',
        properties: {
          projectId: { type: 'string', format: 'uuid' },
          fileId: { type: 'string', format: 'uuid' },
        },
        additionalProperties: false,
        required: ['projectId', 'fileId'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            project: 'projectOutput#',
          },
          additionalProperties: false,
        },
      },
    },
    preHandler: fastify.checkSession(true),
    handler: async (request) => {
      const { projectRepository, fileReferenceRepository } = fastify;
      const { params: { projectId, fileId: fileRefId } } = request;

      const project = await projectRepository.findOneOrFail(projectId);
      const fileref = await fileReferenceRepository.findOneOrFail(fileRefId);

      // TODO: remove file if not referenced
      await fileReferenceRepository.remove(fileref);

      await projectRepository.updateMainImageId(fastify, project);
      const updated = await projectRepository
        .findOneOrFail(projectId, { relations: ['image', 'files'] })
        .then((projects) => projectsToJSON(fastify, projects));
      return { project: updated };
    },
  });

/* ****************************************************************************************************************** */
