import * as fp from 'fastify-plugin';

import schemas from '../api/models/schemas'

export default fp((fastify, __, next) => {
  try {
    schemas.forEach(fastify.addSchema);
    next();
  } catch (error) {
    fastify.log.error(`Error adding schemas, reason: ${error.toString()} ${error.stack}`);
    next(error);
  }
});
