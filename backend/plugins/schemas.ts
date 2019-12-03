import * as fp from 'fastify-plugin';

import { projectInput, projectOutput, projectTypeSchema } from '../schemas/project';

export default fp((fastify, __, next) => {
  try {
    fastify.addSchema(projectTypeSchema);
    fastify.addSchema(projectInput);
    fastify.addSchema(projectOutput);
    next();
  } catch (error) {
    fastify.log.error(`Error adding schemas, reason: ${error.toString()} ${error.stack}`);
    next(error);
  }
});
