import { FastifyInstance, FastifyRequest } from 'fastify';
import { projectsToJSON } from '../libs/toJSON';

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
  handler: async (request) => {
    const { offset: skip, limit: take } = request.query;
    const projects = await fastify
      .projectRepository
      .find({ relations: ['image', 'previewImage', 'files'], skip, take })
      .then((projectsRaw) => projectsToJSON(fastify, projectsRaw));
    return { projects };
  },
});

export const show = (fastify: FastifyInstance) => fastify.route({
  method: 'GET',
  url: '/projects/:projectId',
  schema: {
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
