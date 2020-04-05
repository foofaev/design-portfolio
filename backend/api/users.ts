/* ****************************************************************************************************************** */

import { FastifyInstance } from 'fastify';
import _ from 'lodash';
import { userToJSON } from '../libs/toJSON';

/* ****************************************************************************************************************** */

export const show = (fastify: FastifyInstance): FastifyInstance => fastify.route({
  method: 'GET',
  url: '/api/user',
  preHandler: fastify.checkSession(),
  handler: async (request) => {
    const { user } = request;
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
      },
      additionalProperties: false,
    },
  },
  preHandler: fastify.checkSession(true),
  handler: async (request) => {
    const { body, user } = request;
    const { email, firstName, lastName } = body;
    const { userRepository } = fastify;
    const updateData = userRepository.merge(user, _.pickBy({ email, firstName, lastName }));
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
        password: { type: 'string', minLength: 10 },
      },
      additionalProperties: false,
    },
  },
  preHandler: fastify.checkSession(true),
  handler: async (request) => {
    const { body, user } = request;
    const { password } = body;
    const { userRepository } = fastify;
    await userRepository.update(user.id, { password });
    return {};
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
