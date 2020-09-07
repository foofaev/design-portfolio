/* ****************************************************************************************************************** */

import { FastifyInstance, FastifyReply } from 'fastify';
import moment from 'moment';
import helpers from '../libs/helpers';
import { userToJSON } from '../libs/toJSON';

/* ****************************************************************************************************************** */
const SESSION_EXPIRES_DAYS = process.env.SESSION_EXPIRES_DAYS || 30;

/* ****************************************************************************************************************** */
const checkSession = (fastify: FastifyInstance): FastifyInstance => fastify.route({
  method: 'GET',
  url: '/api/session/check',
  preHandler: fastify.checkSession(true),
  handler: async (request, reply) => {
    const { user } = request;
    if (!user) return reply.notFound();
    return { user: userToJSON(fastify, user) };
  },
});

/* ****************************************************************************************************************** */
type CreateBody = {
  email: string;
  password: string;
};

/* ****************************************************************************************************************** */
const create = (fastify: FastifyInstance) => fastify.route<{ Body: CreateBody }>({
  method: 'PUT',
  url: '/api/session',
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
    reply.status(204);
  },
});

/* ****************************************************************************************************************** */
const destroy = (fastify: FastifyInstance) => fastify.route({
  method: 'DELETE',
  url: '/api/session',
  schema: {
    headers: { $ref: 'sessionHeader' },
  },
  preHandler: fastify.checkSession(true),
  handler: async (request) => {
    const { session } = request;
    if (session) {
      await fastify.sessionRepository.delete(session.id);
      delete request.session;
    }
  },
});

/* ****************************************************************************************************************** */
export {
  checkSession,
  create,
  destroy,
};

/* ****************************************************************************************************************** */
