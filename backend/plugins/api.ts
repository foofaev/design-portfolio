import _ from 'lodash';
import fp from 'fastify-plugin';

import * as projectRoutes from '../api/projects';
import * as fileRoutes from '../api/files';
import * as sessionRoutes from '../api/sessions';
import * as usersRoutes from '../api/users';

export default fp((fastify, __, next) => {
  try {
    const routes = [
      ..._.values(projectRoutes),
      ..._.values(fileRoutes),
      ..._.values(sessionRoutes),
      ..._.values(usersRoutes),
    ];

    routes.forEach((route) => route(fastify));
    next();
  } catch (error) {
    fastify.log.error(`Error building routes, reason: ${(error as Error).toString()}`);
    fastify.log.error(JSON.stringify((error as Error).stack, null, 2));
    next(error);
  }
});
