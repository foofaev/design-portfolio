import { FastifyInstance } from 'fastify';
import * as _ from 'lodash';
import helpers from '../libs/helpers';

type UpdateBody = {
  email?: string,
  firstName?: string,
  lastName?: string,
};

type UpdatePassword = {
  password: string,
};

export const show = (fastify: FastifyInstance) => fastify.route({
  method: 'GET',
  url: '/user',
  schema: {
    headers: 'sessionHeader#',
  },
  preHandler: fastify.checkSession,
  handler: async (request) => {
    const { user } = request;
    return { user };
  },
});

export const update = (fastify: FastifyInstance) => fastify.route<unknown, unknown, unknown, UpdateBody>({
  method: 'PATCH',
  url: '/user',
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string' },
      },
      additionalProperties: false,
    },
    headers: 'sessionHeader#',
  },
  preHandler: fastify.checkSession,
  handler: async (request) => {
    const { body, user } = request;
    const { email, firstName, lastName } = body;
    const { userRepository } = fastify;
    const updateData = userRepository.merge(user, _.pickBy({ email, firstName, lastName }));
    const updatedUser = userRepository.save(updateData);
    return { user: updatedUser };
  },
});

export const updatePassword = (fastify: FastifyInstance) => fastify.route<unknown, unknown, unknown, UpdatePassword>({
  method: 'PATCH',
  url: '/user/password',
  schema: {
    body: {
      type: 'object',
      properties: {
        password: { type: 'string', minLength: 10 },
      },
      additionalProperties: false,
    },
    headers: 'sessionHeader#',
  },
  preHandler: fastify.checkSession,
  handler: async (request) => {
    const { body, user } = request;
    const { password } = body;
    const { userRepository } = fastify;
    await userRepository.update(user.id, { password });
    return {};
  },
});

export const saveImage = (fastify: FastifyInstance) => fastify.route({
  method: 'PATCH',
  url: '/user/image',
  schema: {
    body: {
      type: 'object',
      properties: {
        file: 'rawFileSchema#',
      },
      required: ['file'],
      additionalProperties: false,
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
