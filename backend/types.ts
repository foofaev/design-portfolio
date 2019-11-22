import { ServerResponse, IncomingMessage, Server } from 'http';
import { Db, Repository } from 'typeorm';
import Project from './entities/Project';
import User from './entities/User';
import Session from './entities/Session';

type SessionRequestType = Omit<Session, 'user'>;

declare module 'fastify' {
  interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    db: Db,
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
