import 'reflect-metadata';
import * as path from 'path';

import * as Fastify from 'fastify';
import * as dotenv from 'dotenv';

import * as fastifySensible from 'fastify-sensible';
import * as fastifyStatic from 'fastify-static';
import * as fastifyHelmet from 'fastify-helmet';
import * as Rollbar from 'rollbar';

import api from './plugins/api';
import dbPlugin from './plugins/db';
import authPlugin from './plugins/auth';
import schemasPlugin from './plugins/schemas';

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
    .register(schemasPlugin)
    .register(api)
    .addHook('onError', (request, __, error) => {
      rollbar.error(error, request);
    })
    .get('/status', (__, reply) => {
      reply.send('OK');
    });

  await fastify.ready();
  console.log(fastify.getSchemas());

  return fastify;
};
