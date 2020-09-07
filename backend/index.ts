import 'reflect-metadata';
import path from 'path';

import Fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';

import fastifySensible from 'fastify-sensible';
import fastifyStatic from 'fastify-static';
import fastifyHelmet from 'fastify-helmet';
import fastifyMultipart from 'fastify-multipart';
import Rollbar from 'rollbar';
// import * as Bundler from 'parcel-bundler';

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

export default async (): Promise<FastifyInstance> => {
  dotenv.config({ path: '../.env' });

  const fastify = Fastify({ logger: true });

  // const parcelEntryPoint = path.join(__dirname, '..', 'frontend', 'index.html');
  // const parcelOptions = { hmr: process.env.NODE_ENV !== 'production' };

  // const bundle = new Bundler(parcelEntryPoint, parcelOptions);

  fastify
    .register(fastifySensible)
    .register(fastifyStatic, {
      root: path.join(__dirname, '..', 'dist'),
    })
    .register(fastifyHelmet)
    .register(dbPlugin)
    .register(authPlugin)
    .register(fastifyMultipart, { addToBody: true, sharedSchemaId: 'rawFileSchema' })
    .register(schemasPlugin)
    .register(api)
    .after(() => {
      fastify.setErrorHandler((error, request) => {
        console.error(error); // TODO: proper error handling
        rollbar.error(error, request);
        throw error;
      });
    });

  // fastify.use(bundle.middleware());

  fastify.get('/status', (__, reply) => {
    reply.code(200).send('OK');
  });

  await fastify.ready();

  return fastify;
};
