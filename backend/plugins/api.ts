import * as fp from 'fastify-plugin';
import routes from '../api/controllers'


export default fp((fastify, __, next) => {
  try {
    routes.forEach((route) => route(fastify));
    next();
  } catch (error) {
    fastify.log.error(`Error building routes, reason: ${error.toString()} ${error.stack}`);
    next(error);
  }
});
