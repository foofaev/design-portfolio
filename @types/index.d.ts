/* ****************************************************************************************************************** */

import { ServerResponse, IncomingMessage, Server } from 'http';
import { Connection, Repository } from 'typeorm';

import Project from '../backend/entities/Project';
import User from '../backend/entities/User';
import Session from '../backend/entities/Session';

import UserRepository from '../backend/repositories/UserRepository';
import ProjectRepository from '../backend/repositories/ProjectRepository';
import FileRepository from '../backend/repositories/FileRepository';
import FileReferenceRepository from '../backend/repositories/FileReferenceRepository';

/* ****************************************************************************************************************** */
type SessionRequestType = Omit<Session, 'user'>;

/* ****************************************************************************************************************** */
declare module 'fastify' {
  type FastifyMiddlewareWithOpts = (
    strict?: boolean | void
  ) => FastifyMiddleware;

  interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    db: Connection,
    projectRepository: ProjectRepository,
    userRepository: UserRepository,
    sessionRepository: Repository<Session>,
    fileRepository: FileRepository,
    fileReferenceRepository: FileReferenceRepository,
    checkSession: FastifyMiddlewareWithOpts,
  }

  interface FastifyRequest<
    HttpRequest,
    Query = DefaultQuery,
    Params = DefaultParams,
    Headers = DefaultHeaders,
  > {
    session: SessionRequestType;
    user: User
  }
}

/* ****************************************************************************************************************** */

// declare module 'fastify-csrf' {

// }


/* ****************************************************************************************************************** */
export type EntityWithUrlKey = Project;

/* ****************************************************************************************************************** */
