import * as fp from 'fastify-plugin';

import addProjectSchemas from '../schemas/project';

export default fp((fastify, __, next) => {
  try {
    addProjectSchemas(fastify);
    next();
  } catch (error) {
    fastify.log.error(`Error adding schemas, reason: ${error.toString()} ${error.stack}`);
    next(error);
  }
});
