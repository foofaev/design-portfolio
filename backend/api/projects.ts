import { FastifyInstance, FastifyRequest } from 'fastify';
import { projectsToJSON } from '../libs/toJSON';

export const index = (fastify: FastifyInstance) => fastify.route({
  method: 'GET',
  url: '/projects',
  schema: {
    response: {
      200: { type: 'array', items: { $ref: 'projectOutput#' } },
    },
  },
  handler: async () => {
    const projects = await fastify
      .projectRepository
      .find({ relations: ['image', 'previewImage', 'files'] })
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
        project: 'projectOutput#',
      },
    },
  },
  // preHandler: fastify.checkSession,
  handler: async (request: FastifyRequest) => {
    const { projectId } = request.params;
    const project = await fastify
      .projectRepository
      .findOneOrFail(projectId, { relations: ['image', 'previewImage', 'files'] })
      .then((projectRaw) => projectsToJSON(fastify, projectRaw));
    fastify.log.info(project);
    return { project };
  },
});
