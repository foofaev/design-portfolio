/* ****************************************************************************************************************** */

import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginCallback } from 'fastify';

import { projectInput, projectOutput, projectTypeSchema } from '../schemas/project';
import { sessionHeader } from '../schemas/session';
import { userInput, userOutput } from '../schemas/user';

/* ****************************************************************************************************************** */
const schemaRegisterPlugin: FastifyPluginCallback = (fastify, __, next) => {
  try {
    fastify.addSchema(projectTypeSchema);
    fastify.addSchema(projectInput);
    fastify.addSchema(projectOutput);
    fastify.addSchema(sessionHeader);
    fastify.addSchema(userInput);
    fastify.addSchema(userOutput);
    next();
  } catch (error) {
    fastify.log.error(`Error adding schemas, reason: ${(error as Error).toString()}`);
    fastify.log.error(JSON.stringify((error as Error).stack, null, 2));
    next(error);
  }
};

/* ****************************************************************************************************************** */
export default fastifyPlugin(schemaRegisterPlugin);

/* ****************************************************************************************************************** */
