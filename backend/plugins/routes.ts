import * as _ from 'lodash';
import * as fp from 'fastify-plugin';

import * as projectRoutes from '../routes/projects';

export default fp((fastify, __, next) => {
  try {
    _.forEach(projectRoutes, (route) => route(fastify));
    next();
  } catch (error) {
    fastify.log.error(`Error building routes, reason: ${error.toString()} ${error.stack}`);
    next(error);
  }
});
