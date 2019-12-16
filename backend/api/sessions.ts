import { FastifyInstance } from 'fastify';
import * as moment from 'moment';
import helpers from '../libs/helpers';

const SESSION_EXPIRES_DAYS = process.env.SESSION_EXPIRES_DAYS || 30;

type CreateBody = {
  email: string,
  password: string,
};

export const create = (fastify: FastifyInstance) => fastify.route<unknown, unknown, unknown, CreateBody>({
  method: 'PUT',
  url: '/session',
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 1 },
      },
      required: ['email', 'password'],
      additionalProperties: false,
    },
  },
  handler: async (request, reply) => {
    const { ip = '', body } = request;
    const { email, password } = body;
    const { sessionRepository, userRepository } = fastify;
    const user = await userRepository.findOneOrFail({ where: { email: email.toLowerCase() } });

    if (!helpers.verifyPassword(password, user.password)) {
      reply.unauthorized();
      return;
    }

    const sessionData = {
      expiresAt: helpers.formatTimestamp(moment().add(SESSION_EXPIRES_DAYS, 'days')),
      ip,
      user,
    };

    const session = await sessionRepository.save(sessionData);
    request.session = session;
    reply.code(200).send({});
  },
});

export const destroy = (fastify: FastifyInstance) => fastify.route({
  method: 'DELETE',
  url: '/session',
  schema: {
    headers: 'sessionHeader#',
  },
  preHandler: fastify.checkSession(true),
  handler: async (request, reply) => {
    const { session } = request;
    await fastify.sessionRepository.delete(session.id);
    delete request.session;
    reply.code(200).send();
  },
});
