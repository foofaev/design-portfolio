import { IncomingMessage, ServerResponse } from 'http';
import {
  FastifyInstance, FastifyRequest, FastifyReply, FastifyMiddlewareWithPayload,
} from 'fastify';
import * as fp from 'fastify-plugin';
import * as _ from 'lodash';
import * as moment from 'moment';

import * as fastifyCookie from 'fastify-cookie';
import fastifyCsurf from 'fastify-csrf';

import helpers from '../helpers';

const cookieSecret = process.env.SESSION_COOKIE_SECRET || 'mySecretCookieRecepy';
const cookiePath = process.env.SESSION_COOKIE_PATH || '/';
const cookieSessionName = process.env.SESSION_COOKIE_NAME || '_sess';
const sessionExpiresHH = process.env.SESSION_EXPIRES_HH || 1;
const cookieCSRFName = process.env.CSRF_COOKIE_NAME || '_csrf';

const checkSession = (fastify: FastifyInstance) => async (request: FastifyRequest<IncomingMessage>) => {
  const { url } = request.raw;
  if (!url || url.indexOf(cookiePath) !== 0) {
    return;
  }
  const encriptedSessionId = _.get(request, `cookies.${cookieSessionName}`);
  if (!encriptedSessionId) throw new Error('Invalid session');
  const decryptedSessionId = helpers.unsignCookie(encriptedSessionId, cookieSecret);
  if (!decryptedSessionId) throw new Error('Invalid session');

  const session = await fastify.sessionRepository.findOneOrFail(
    decryptedSessionId,
    { relations: ['user'] },
  );

  if (moment.utc().isAfter(helpers.parseTimestamp(session.expiresAt))) {
    await fastify.sessionRepository.delete(decryptedSessionId);
    throw new Error('Invalid session');
  }

  session.expiresAt = helpers.formatTimestamp(moment().add(sessionExpiresHH, 'hours'));
  const updatedSession = await fastify.sessionRepository.save(session);
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

const setSession: FastifyMiddlewareWithPayload = (
  request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>,
) => {
  try {
    const { session } = request;
    if (!shouldSetSession(request)) {
      return;
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
  } catch (error) {
    request.log.error(`Error setting session to cookie, reason: ${error.toString()} ${error.stack}`);
    throw error;
  }
};

export default fp(async (fastify: FastifyInstance) => {
  fastify
    .register(fastifyCookie)
    .decorateRequest('session', {})
    .decorateRequest('user', {})
    .decorate('checkSession', checkSession(fastify))
    .addHook('onSend', setSession)
    .register(fastifyCsurf, { key: cookieCSRFName, ignoreMethods: ['GET', 'HEAD', 'OPTIONS'] });
});
