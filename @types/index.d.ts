import { ServerResponse, IncomingMessage, Server } from 'http';
import { Connection, Repository, DeepPartial } from 'typeorm';

import Project from '../backend/entities/Project';
import User from '../backend/entities/User';
import Session from '../backend/entities/Session';

import FileRepository from '../backend/repositories/FileRepository';
import FileReferenceRepository from '../backend/repositories/FileReferenceRepository';

type SessionRequestType = Omit<Session, 'user'>;

interface CustomRepository<T> extends Repository<T> {
  generateUrlKey(
    item: DeepPartial<Project>,
    uriPart: number,
    actuallyUpdateUrlKey: boolean | void
  ): Promise<DeepPartial<Project> | string>
}

declare module 'fastify' {
  interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    db: Connection,
    projectRepository: CustomRepository<Project>,
    userRepository: Repository<User>,
    sessionRepository: Repository<Session>,
    fileRepository: FileRepository,
    fileReferenceRepository: FileReferenceRepository,
    checkSession: FastifyMiddleware,
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

// declare module 'fastify-csrf' {

// }


export type EntityWithUrlKey = Project;
