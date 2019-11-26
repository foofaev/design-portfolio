import { ServerResponse, IncomingMessage, Server } from 'http';
import { Connection, Repository } from 'typeorm';
import Project from '../backend/entities/Project';
import User from '../backend/entities/User';
import Session from '../backend/entities/Session';

type SessionRequestType = Omit<Session, 'user'>;

declare module 'fastify' {
  interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    db: Connection,
    projectRepository: Repository<Project>,
    userRepository: Repository<User>,
    sessionRepository: Repository<Session>,
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
