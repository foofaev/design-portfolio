import { IncomingMessage } from 'http';
import {
  FastifyInstance, FastifyRequest, FastifyMiddlewareWithPayload,
} from 'fastify';
import * as fp from 'fastify-plugin';
import * as _ from 'lodash';
import * as moment from 'moment';

import * as fastifyCookie from 'fastify-cookie';
// import fastifyCsurf from 'fastify-csrf';

import helpers from '../libs/helpers';

const cookieSecret = process.env.SESSION_COOKIE_SECRET || 'mySecretCookieRecepy';
const cookiePath = process.env.SESSION_COOKIE_PATH || '/';
const cookieSessionName = process.env.SESSION_COOKIE_NAME || '_sess';
const sessionExpiresDays = process.env.SESSION_EXPIRES_DAYS || 30;
// const cookieCSRFName = process.env.CSRF_COOKIE_NAME || '_csrf';

const checkSession = (fastify: FastifyInstance) => (strict: boolean | void) => async (request: FastifyRequest) => {
  const { sessionRepository } = fastify;
  const { url } = request.req;
  const { ip } = request;

  if (!url || url.indexOf(cookiePath) !== 0) {
    return;
  }

  const encriptedSessionId = _.get(request, `cookies.${cookieSessionName}`);

  if (!encriptedSessionId && !strict) return;
  if (!encriptedSessionId) throw new Error('Invalid session');

  const decryptedSessionId = helpers.unsignCookie(encriptedSessionId, cookieSecret);
  if (!decryptedSessionId) throw new Error('Invalid session');

  const session = await sessionRepository.findOne(decryptedSessionId, { where: { ip }, relations: ['user'] });

  if (!session) throw new Error('Invalid session');

  if (moment.utc().isAfter(helpers.parseTimestamp(session.expiresAt))) {
    await fastify.sessionRepository.delete(decryptedSessionId);
    throw new Error('Invalid session');
  }

  if (session.ip && session.ip !== ip) {
    await fastify.sessionRepository.delete(decryptedSessionId);
    throw new Error('Invalid session');
  }

  session.expiresAt = helpers.formatTimestamp(moment().add(sessionExpiresDays, 'days'));
  const updatedSession = await sessionRepository.save(session);
  const { user } = session;

  request.session = updatedSession;
  request.user = user;
};

const shouldSetSession = (request: FastifyRequest<IncomingMessage>) => {
  const { session } = request;
  if (!session || !session.id) return false;
  return true;
  /* #TODO: use after switch to https
  const { connection } = request.req;
  if (connection && connection.encrypted === true) {
    return true;
  }
  const forwardedProto = request.headers['x-forwarded-proto'];
  return forwardedProto === 'https';
  */
};

const setSession: FastifyMiddlewareWithPayload = (request, reply, __, next) => {
  try {
    const { session } = request;
    if (!shouldSetSession(request)) {
      return next();
    }
    const encryptedSessionId = helpers.signCookie(session.id, cookieSecret);
    const expires = new Date(session.expiresAt);
    reply.setCookie(
      cookieSessionName,
      encryptedSessionId,
      {
        path: cookiePath,
        sameSite: true,
        httpOnly: true,
        expires,
        secure: false, // enable when using https
      },
    );
    return next();
  } catch (error) {
    request.log.error(`Error setting session to cookie, reason: ${error.toString()} ${error.stack}`);
    return next(error);
  }
};

export default fp((fastify, __, next) => {
  try {
    fastify
      .register(fastifyCookie)
      .decorateRequest('session', {})
      .decorateRequest('user', {})
      .decorate('checkSession', checkSession(fastify))
      .addHook('onSend', setSession);
    next();
  } catch (error) {
    next(error);
  }
});
// .register(fastifyCsurf, { key: cookieCSRFName, ignoreMethods: ['GET', 'HEAD', 'OPTIONS'] });
