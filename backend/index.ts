import * as path from 'path';

import * as Fastify from 'fastify';
import * as dotenv from 'dotenv';

import * as fastifySensible from 'fastify-sensible';
import * as fastifyStatic from 'fastify-static';
import * as fastifyHelmet from 'fastify-helmet';
import * as Rollbar from 'rollbar';

import dbPlugin from './plugins/db';
import routesPlugin from './plugins/routes';
import authPlugin from './plugins/auth';

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export default async () => {
  dotenv.config({ path: '../.env' });

  const fastify = Fastify({
    logger: {
      level: 'info',
      prettyPrint: { colorize: true, levelFirst: true, translateTime: true },
    },
  });

  fastify
    .register(fastifySensible)
    .register(fastifyStatic, {
      root: path.join(__dirname, '..', 'public', 'assets'),
      prefix: '/assets/',
    })
    .register(fastifyHelmet, {
      hidePoweredBy: { setTo: 'PHP 4.2.0' },
    })
    .register(dbPlugin)
    .register(authPlugin)
    .addHook('onClose', (instance, done) => {
      instance.db.close();
      done();
    })
    .addHook('onError', (request, __, error) => {
      rollbar.error(error, request);
    })
    .register(routesPlugin)
    .get('/status', (__, reply) => {
      reply.status(200).send('OK');
    })
    .ready(() => {
      console.log(fastify.printRoutes());
    });

  fastify.after(console.log);

  return fastify;
};
