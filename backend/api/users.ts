/* ****************************************************************************************************************** */

import { FastifyInstance, FastifyRequest } from 'fastify';
import helpers from '../libs/helpers';
import { userToJSON } from '../libs/toJSON';

/* ****************************************************************************************************************** */

export const show = (fastify: FastifyInstance): FastifyInstance => fastify.route({
  method: 'GET',
  url: '/api/user',
  preHandler: fastify.checkSession(),
  handler: async () => {
    const user = await fastify.userRepository.findOneOrFail();
    return { user: userToJSON(fastify, user) };
  },
});

/* ****************************************************************************************************************** */
type UserUpdate = {
    email?: string;
    firstName?: string;
    lastName?: string;
    about?: string;
    description?: string;
    facebookLink?: string;
    instagramLink?: string;
    vkLink?: string;
};

export const update = (fastify: FastifyInstance): FastifyInstance => fastify
  .route<{ Body: UserUpdate }>({
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
    handler: async (request, reply) => {
      const { body, user } = request;
      // TODO: user should be required
      if (!user) {
        return reply.notFound();
      }
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
type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

export const updatePassword = (fastify: FastifyInstance): FastifyInstance => fastify
  .route<{ Body: UpdatePassword }>({
    method: 'PATCH',
    url: '/api/user/password',
    schema: {
      body: {
        type: 'object',
        properties: {
          oldPassword: { type: 'string', minLength: 1 },
          newPassword: { type: 'string', minLength: 1 },
        },
        required: ['oldPassword', 'newPassword'],
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
    handler: async (request, reply): Promise<void> => {
      const { body, user } = request;
      const { oldPassword, newPassword } = body;
      // TODO: user should be required
      if (!user) {
        return reply.notFound();
      }

      if (!helpers.verifyPassword(oldPassword, user.password)) {
        request.log.info(oldPassword);
        request.log.info(user.password);
        return reply.unauthorized();
      }
      const { userRepository } = fastify;
      await userRepository.update(user.id, { password: newPassword });
      return reply.status(200);
    },
  });

/* ****************************************************************************************************************** */
type FileInput = {
  file: { filename: string; mimetype: string; data: Buffer } [];
};

export const saveImage = (fastify: FastifyInstance): FastifyInstance => fastify
  .route<{ Body: FileInput }>({
    method: 'PATCH',
    url: '/api/user/image',
    schema: {
      body: {
        type: 'object',
        properties: {
          file: { type: 'array', items: { $ref: 'rawFileSchema' } },
        },
        required: ['file'],
        additionalProperties: false,
      },
      response: {
        200: {
          type: 'object',
          properties: {
            user: { $ref: 'userOutput' },
          },
          additionalProperties: false,
        },
      },
    },
    preHandler: fastify.checkSession(true),
    handler: async (request, reply) => {
      const { userRepository } = fastify;
      const { body, user } = request;
      // TODO: user should be required
      if (!user) {
        return reply.notFound();
      }
      const rawFile = body.file[0];
      const fileData = { name: rawFile.filename, contentType: rawFile.mimetype, data: rawFile.data };
      await userRepository.updateImage(fastify, user.id, fileData);
      const updatedUser = await userRepository
        .findOneOrFail(user.id)
        .then((found) => userToJSON(fastify, found));
      return { user: updatedUser };
    },
  });

/* ****************************************************************************************************************** */
export const removeImage = (fastify: FastifyInstance): FastifyInstance => fastify
  .route({
    method: 'DELETE',
    url: '/api/user/image',
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            user: { $ref: 'userOutput' },
          },
          additionalProperties: false,
        },
      },
    },
    preHandler: fastify.checkSession(true),
    handler: async (request, reply) => {
      const { userRepository } = fastify;
      const { user } = request;
      if (!user) return reply.notFound();

      await userRepository.removeImage(fastify, user.id);

      const updatedUser = await userRepository
        .findOneOrFail(user.id, { relations: ['image'] })
        .then((found) => userToJSON(fastify, found));
      return { user: updatedUser };
    },
  });

/* ****************************************************************************************************************** */
