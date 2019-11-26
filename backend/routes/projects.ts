import { FastifyInstance, FastifyRequest } from 'fastify';

export const index = (fastify: FastifyInstance) => fastify.route({
  method: 'GET',
  url: '/projects',
  handler: async () => {
    fastify.log.info('123');
    const projects = await fastify.projectRepository.find();
    return { projects };
  },
});

export const show = (fastify: FastifyInstance) => fastify.route({
  method: 'GET',
  url: '/projects/:projectId',
  preHandler: fastify.checkSession,
  handler: async (request: FastifyRequest) => {
    const { projectId } = request.params;
    const project = await fastify.projectRepository.findByIds(projectId);
    fastify.log.info(project);
    return project;
  },
});
