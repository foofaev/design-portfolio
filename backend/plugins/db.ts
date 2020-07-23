import { callbackify } from 'util';
import * as fastifyPlugin from 'fastify-plugin';
import { createConnection, getConnectionOptions, ConnectionOptions } from 'typeorm';
import ProjectRepository from '../repositories/ProjectRepository';
import FileRepository from '../repositories/FileRepository';
import FileReferenceRepository from '../repositories/FileReferenceRepository';
import UserRepository from '../repositories/UserRepository';

import Session from '../entities/Session';

const createConnectionCb = callbackify((connectionOptions: ConnectionOptions) => createConnection(connectionOptions));
const getConnectionOptionsCb = callbackify(() => getConnectionOptions());

export default fastifyPlugin((fastify, __, next) => {
  getConnectionOptionsCb((error, connectionOptions) => {
    if (error) {
      fastify.log.error(`Error get db connectionOptions, reason: ${error.toString()}`);
      if (error.stack) fastify.log.error(error.stack);
      next(error);
    }
    Object.assign(connectionOptions, {
      options: { encrypt: true },
    });
    fastify.log.info(`connecting to database: ${connectionOptions.type}...`);
    createConnectionCb(connectionOptions, (error, dbConnection) => {
      if (error) {
        fastify.log.error(`Error get db connection, reason: ${error.toString()}`);
        if (error.stack) fastify.log.error(error.stack);
        next(error);
      }
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
    });
  });
});
