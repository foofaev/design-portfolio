import 'reflect-metadata';
import * as fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import createCustomRepository from '../libs/customRepository';

import Project from '../entities/Project';
import User from '../entities/User';
import Session from '../entities/Session';

export default fp(async (fastify) => {
  try {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
      options: { encrypt: true },
    });

    fastify.log.info(`connecting to database: ${connectionOptions.type}...`);
    const dbConnection = await createConnection(connectionOptions);
    fastify.log.info('database connected');

    const customRepository = createCustomRepository(Project);
    fastify
      .decorate('db', dbConnection)
      .decorate('projectRepository', dbConnection.getCustomRepository(customRepository))
      .decorate('userRepository', dbConnection.getRepository(User))
      .decorate('sessionRepository', dbConnection.getRepository(Session));
  } catch (error) {
    fastify.log.error(`Error connecting to database, reason: ${error.toString()} ${error.stack}`);
    throw error;
  }
});
