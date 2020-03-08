import * as fp from 'fastify-plugin';
import { createConnection, getConnectionOptions } from 'typeorm';
import ProjectRepository from '../database/repositories/ProjectRepository';
import FileRepository from '../database/repositories/FileRepository';
import FileReferenceRepository from '../database/repositories/FileReferenceRepository';
import UserRepository from '../database/repositories/UserRepository';

import Session from '../database/entities/Session';

export default fp(async (fastify, __, next) => {
  try {
    const connectionOptions = await getConnectionOptions();
    Object.assign(connectionOptions, {
      options: { encrypt: true },
    });

    fastify.log.info(`connecting to database: ${connectionOptions.type}...`);
    const dbConnection = await createConnection(connectionOptions);
    fastify.log.info('database connected');

    fastify
      .decorate('db', dbConnection)
      .decorate('projectRepository', dbConnection.getCustomRepository(ProjectRepository))
      .decorate('userRepository', dbConnection.getCustomRepository(UserRepository))
      .decorate('sessionRepository', dbConnection.getRepository(Session))
      .decorate('fileRepository', dbConnection.getCustomRepository(FileRepository))
      .decorate('fileReferenceRepository', dbConnection.getCustomRepository(FileReferenceRepository))
      .addHook('onClose', async (instance, done) => {
        try {
          if (instance.db) await instance.db.close();
          done();
        } catch (error) {
          fastify.log.error('fastify.onClose(): ERROR closing db');
          console.error(error);
          done();
        }
      });
    next();
  } catch (error) {
    fastify.log.error(`Error connecting to database, reason: ${error.toString()} ${error.stack}`);
    next(error);
  }
});