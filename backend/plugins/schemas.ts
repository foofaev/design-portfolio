import * as fp from 'fastify-plugin';

import { projectInput, projectOutput, projectTypeSchema } from '../schemas/project';
import { sessionHeader } from '../schemas/session';

export default fp((fastify, __, next) => {
  try {
    fastify.addSchema(projectTypeSchema);
    fastify.addSchema(projectInput);
    fastify.addSchema(projectOutput);
    fastify.addSchema(sessionHeader);
    next();
  } catch (error) {
    fastify.log.error(`Error adding schemas, reason: ${error.toString()} ${error.stack}`);
    next(error);
  }
});
