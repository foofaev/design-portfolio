/* ****************************************************************************************************************** */

import { IncomingMessage, ServerResponse } from 'http';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import _ from 'lodash';
import { filesService } from '../../services';

import { Query, Params } from './intefaces/getFiles';
import filesSchema from './schemas/getFilesInput';
import mapGetFileParamsToImageParams from './mappers/getFiles';

/* ****************************************************************************************************************** */
const CACHE_CONTROL = 'max-age=31536000';

/* ****************************************************************************************************************** */
const handleFileRequest = ({ fastify, isFile }: { fastify: FastifyInstance; isFile: boolean }) => async (
  request: FastifyRequest<IncomingMessage, Query, Params>,
  response: FastifyReply<ServerResponse>,
): Promise<FastifyReply<ServerResponse> | void> => {
  const { params, query } = request;
  const { fileWhere, imageParams } = mapGetFileParamsToImageParams(params, query, isFile);
  if (!fileWhere || !imageParams) return response.badRequest();

  const file = await filesService.getFile(fastify, fileWhere, imageParams);
  if (!file) return response.notFound();

  const { name, content, contentType } = file;

  const encodedFileName = name && encodeURIComponent(name);
  return response
    .header('content-type', contentType)
    .header('cache-control', CACHE_CONTROL)
    .header('content-disposition', `inline; filename="${encodedFileName}"; filename*=UTF-8''${encodedFileName}`)
    .send(content);
};

/* ****************************************************************************************************************** */
export default (fastify: FastifyInstance): FastifyInstance => fastify
  .route<Query, Params>({
    method: 'GET',
    schema: filesSchema,
    url: '/files/:fileUrl',
    handler: handleFileRequest({ fastify, isFile: true }),
  })
  .route<Query, Params>({
    method: 'GET',
    schema: filesSchema,
    url: '/images/:fileUrl',
    handler: handleFileRequest({ fastify, isFile: false }),
  });

/* ****************************************************************************************************************** */
