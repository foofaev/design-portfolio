import { FastifyInstance, FastifyRequest, DefaultQuery, DefaultHeaders } from 'fastify';
import { projectsToJSON } from '../libs/toJSON';
import Project from '../entities/Project';

type Params = { projectId: string };

export const index = (fastify: FastifyInstance) => fastify.route({
  method: 'GET',
  url: '/projects',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        limit: { type: 'number' },
        offset: { type: 'number' },
      },
      required: ['limit', 'offset'],
      additionalProperties: false,
    },
    response: {
      200: {
        type: 'object',
        properties: {
          projects: { type: 'array', items: 'projectOutput#' },
        },
      },
    },
  },
  preHandler: fastify.checkSession,
  handler: async (request) => {
    const { offset: skip, limit: take } = request.query;
    const projects = await fastify
      .projectRepository
      .find({ relations: ['image', 'previewImage', 'files'], skip, take })
      .then((projectsRaw) => projectsToJSON(fastify, projectsRaw));
    return { projects };
  },
});

export const show = (fastify: FastifyInstance) => fastify.route<DefaultQuery, Params, DefaultHeaders>({
  method: 'GET',
  url: '/projects/:projectId',
  schema: {
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
  preHandler: fastify.checkSession,
  handler: async (request: FastifyRequest) => {
    const { projectId } = request.params;
    const project = await fastify
      .projectRepository
      .findOneOrFail(projectId, { relations: ['image', 'previewImage', 'files'] })
      .then((projectRaw) => projectsToJSON(fastify, projectRaw));
    return { project };
  },
});

export const save = (fastify: FastifyInstance) => fastify.route<unknown, unknown, unknown, Partial<Project>>({
  method: 'PUT',
  url: '/projects',
  schema: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        isVisible: { type: 'boolean' },
        publishedAt: { type: 'string' },
      },
      required: ['title', 'description', 'isVisible'],
      additionalProperties: false,
    },
    headers: 'sessionHeader#',
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
  preHandler: fastify.checkSession,
  handler: async (request) => {
    const { projectRepository } = fastify;
    const { body } = request;

    const saved = await projectRepository.save(body);
    await projectRepository.generateUrlKey(saved, -1, true);
    const result = await projectRepository.findOne(saved.id, { relations: ['image', 'previewImage', 'files'] })
      .then((projectsRaw: Project) => projectsToJSON(fastify, projectsRaw));
    return { project: result };
  },
});

export const update = (fastify: FastifyInstance) => fastify.route<unknown, Params, unknown, Partial<Project>>({
  method: 'PATCH',
  url: '/projects/:projectId',
  schema: {
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        isVisible: { type: 'boolean' },
        publishedAt: { type: 'string' },
      },
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
    headers: 'sessionHeader#',
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
  preHandler: fastify.checkSession,
  handler: async (request) => {
    const { projectRepository } = fastify;
    const { body, params: { projectId } } = request;

    await projectRepository.update(projectId, body);
    const updated = await projectRepository
      .findOne(projectId, { relations: ['image', 'previewImage', 'files'] })
      .then((projectsRaw: Project) => projectsToJSON(fastify, projectsRaw));
    return { project: updated };
  },
});

export const saveProjectImage = (fastify: FastifyInstance) => fastify.route({
  method: 'PATCH',
  url: '/projects/:projectId',
  schema: {
    body: {
      type: 'object',
      properties: {
        ord: { type: 'integer' },
        file: 'rawFileSchema#',
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
    headers: 'sessionHeader#',
    response: {
      200: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
  preHandler: fastify.checkSession,
  handler: async (request) => {
    const { projectRepository, fileRepository, fileReferenceRepository } = fastify;
    const { body, params: { projectId } } = request;
    const rawFile = body.file[0];
    const fileData = { name: rawFile.filename, contentType: rawFile.mimetype, data: rawFile.data };

    const project = await projectRepository.findOneOrFail(projectId);
    const file = await fileRepository.createFromFileIfNotExists(fileData);
    await fileReferenceRepository.createWithFile(
      file,
      { item: project, itemType: 'project', purpose: 'file', ord: body.ord },
    );

    await projectRepository.updateMainImageId(fastify, project);
    return {};
  },
});

export const updateProjectImageOrd = (fastify: FastifyInstance) => fastify.route({
  method: 'PATCH',
  url: '/projects/:projectId',
  schema: {
    body: {
      type: 'object',
      properties: {
        ord: { type: 'integer' },
        fileId: { type: 'string', format: 'uuid' },
      },
      required: ['fileId', 'ord'],
      additionalProperties: false,
    },
    params: {
      type: 'object',
      properties: {
        projectId: { type: 'string', format: 'uuid' },
      },
      additionalProperties: false,
      required: ['projectId'],
    },
    headers: 'sessionHeader#',
    response: {
      200: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
  preHandler: fastify.checkSession,
  handler: async (request) => {
    const { projectRepository, fileReferenceRepository } = fastify;
    const { body: { fileId, ord }, params: { projectId } } = request;

    const project = await projectRepository.findOneOrFail(projectId);

    await fileReferenceRepository.update(fileId, { ord });
    await projectRepository.updateMainImageId(fastify, project);
    return {};
  },
});

export const removeProjectImage = (fastify: FastifyInstance) => fastify.route({
  method: 'DELETE',
  url: '/projects/:projectId/:fileId',
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
    headers: 'sessionHeader#',
    response: {
      200: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
  preHandler: fastify.checkSession,
  handler: async (request) => {
    const { projectRepository, fileReferenceRepository } = fastify;
    const { params: { projectId, fileId: fileRefId } } = request;

    const project = await projectRepository.findOneOrFail(projectId);
    const fileref = await fileReferenceRepository.findOneOrFail(fileRefId);

    // TODO: remove file if not referenced
    await fileReferenceRepository.remove(fileref);

    await projectRepository.updateMainImageId(fastify, project);
    return {};
  },
});
