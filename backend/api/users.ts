/* ****************************************************************************************************************** */

import { FastifyInstance } from 'fastify';
import * as _ from 'lodash';
import helpers from '../libs/helpers';
import { userToJSON } from '../libs/toJSON';

/* ****************************************************************************************************************** */

export const show = (fastify: FastifyInstance): FastifyInstance => fastify.route({
  method: 'GET',
  url: '/api/user',
  preHandler: fastify.checkSession(),
  handler: async (request) => {
    const user = await fastify.userRepository.findOneOrFail();
    return { user: userToJSON(fastify, user) };
  },
});

/* ****************************************************************************************************************** */
export const update = (fastify: FastifyInstance): FastifyInstance => fastify.route({
  method: 'PATCH',
  url: '/api/user',
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string' },
        about: { type: 'string' },
        description: { type: 'string' },
        facebookLink: { anyOf: [{ type: 'string', format: 'url' }, { type: 'string', maxLength: 0 }] },
        instagramLink: { anyOf: [{ type: 'string', format: 'url' }, { type: 'string', maxLength: 0 }] },
        vkLink: { anyOf: [{ type: 'string', format: 'url' }, { type: 'string', maxLength: 0 }] },
      },
      additionalProperties: false,
    },
  },
  preHandler: fastify.checkSession(true),
  handler: async (request) => {
    const { body, user } = request;
    const { userRepository } = fastify;
    const updateData = userRepository.merge(user, body);
    await userRepository.save(updateData);
    const updatedUser = await userRepository
      .findOneOrFail(user.id, { relations: ['image'] })
      .then((found) => userToJSON(fastify, found));
    return { user: updatedUser };
  },
});

/* ****************************************************************************************************************** */
export const updatePassword = (fastify: FastifyInstance): FastifyInstance => fastify.route({
  method: 'PATCH',
  url: '/api/user/password',
  schema: {
    body: {
      type: 'object',
      properties: {
        oldPassword: { type: 'string', minLength: 1 },
        newPassword: { type: 'string', minLength: 1 },
      },
      additionalProperties: false,
    },
    response: {
      200: {
        type: 'object',
        properties: {},
        additionalProperties: false,
      },
    },
  },
  preHandler: fastify.checkSession(true),
  handler: async (request, reply): Promise<{} | void> => {
    const { body, user } = request;
    const { oldPassword, newPassword } = body;

    if (!helpers.verifyPassword(oldPassword, user.password)) {
      request.log.info(oldPassword);
      request.log.info(user.password);
      reply.unauthorized();
      return;
    }
    const { userRepository } = fastify;
    await userRepository.update(user.id, { password: newPassword });
    reply.code(200).send({});
  },
});

/* ****************************************************************************************************************** */
export const saveImage = (fastify: FastifyInstance): FastifyInstance => fastify.route({
  method: 'PATCH',
  url: '/api/user/image',
  schema: {
    body: {
      type: 'object',
      properties: {
        file: { type: 'array', items: 'rawFileSchema#' },
      },
      required: ['file'],
      additionalProperties: false,
    },
    response: {
      200: {
        type: 'object',
        properties: {
          user: 'userOutput#',
        },
        additionalProperties: false,
      },
    },
  },
  preHandler: fastify.checkSession(true),
  handler: async (request) => {
    const { userRepository } = fastify;
    const { body, user } = request;
    const rawFile = body.file[0];
    const fileData = { name: rawFile.filename, contentType: rawFile.mimetype, data: rawFile.data };
    await userRepository.updateImage(fastify, user.id, fileData);
    const updatedUser = await userRepository
      .findOneOrFail(user.id, { relations: ['image'] })
      .then((found) => userToJSON(fastify, found));
    return { user: updatedUser };
  },
});

/* ****************************************************************************************************************** */
export const removeImage = (fastify: FastifyInstance): FastifyInstance => fastify.route({
  method: 'DELETE',
  url: '/api/user/image',
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          user: 'userOutput#',
        },
        additionalProperties: false,
      },
    },
  },
  preHandler: fastify.checkSession(true),
  handler: async (request) => {
    const { userRepository } = fastify;
    const { user } = request;

    await userRepository.removeImage(fastify, user.id);

    const updatedUser = await userRepository
      .findOneOrFail(user.id, { relations: ['image'] })
      .then((found) => userToJSON(fastify, found));
    return { user: updatedUser };
  },
});

/* ****************************************************************************************************************** */
