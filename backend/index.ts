import 'reflect-metadata';
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

export default async (): Promise<Fastify.FastifyInstance> => {
  dotenv.config({ path: '../.env' });

  const fastify = Fastify({
    logger: {
      level: 'info',
      prettyPrint: { colorize: true, levelFirst: true, translateTime: true },
    },
  });

  fastify
    .register(fastifySensible)
    // .register(fastifyStatic, {
    //   root: path.join(__dirname, '..', 'public', 'assets'),
    //   prefix: '/assets/',
    // })
    .register(fastifyHelmet, {
      hidePoweredBy: { setTo: 'PHP 4.2.0' },
    })
    .register(dbPlugin)
    .register(authPlugin)
    .register(routesPlugin)
    .addHook('onError', (request, __, error) => {
      rollbar.error(error, request);
    })
    .get('/status', (__, reply) => {
      reply.send('OK');
    });

  await fastify.ready();

  return fastify;
};
