import * as _ from 'lodash';

import { FastifyInstance } from 'fastify';
import * as fp from 'fastify-plugin';

import * as projectRoutes from '../routes/projects';

export default fp((fastify: FastifyInstance, next) => {
  try {
    _.forEach(projectRoutes, (route: Function) => route(fastify));
    next();
  } catch (error) {
    fastify.log.error(`Error building routes, reason: ${error.toString()} ${error.stack}`);
    next(error);
  }
});
