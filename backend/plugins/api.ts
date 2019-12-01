import * as _ from 'lodash';
import * as fp from 'fastify-plugin';

import * as projectRoutes from '../api/projects';
import * as fileRoutes from '../api/files';

export default fp((fastify, __, next) => {
  try {
    [..._.values(projectRoutes), ..._.values(fileRoutes)].forEach((route) => route(fastify));
    next();
  } catch (error) {
    fastify.log.error(`Error building routes, reason: ${error.toString()} ${error.stack}`);
    next(error);
  }
});
