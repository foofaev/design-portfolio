/* ****************************************************************************************************************** */

import { readFileSync } from 'fs';

import { ServerResponse } from 'http';
import { FastifyInstance, FastifyReply } from 'fastify';

import * as _ from 'lodash';
import * as sharp from 'sharp';
import validator from 'validator';
import File from '../entities/File';

/* ****************************************************************************************************************** */

const ALLOWED_IMAGE_TYPES = ['gif', 'jpg', 'png', 'jpeg'];
const DEFAULT_QUALITY = 80;
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;

/* ****************************************************************************************************************** */

interface Query {
  noColor?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  fit?: keyof sharp.FitEnum;
  keepAspect?: boolean;
  noUpscale?: boolean;
}

/* ****************************************************************************************************************** */
interface FileWhere {
  id?: string;
  num?: number;
}

/* ****************************************************************************************************************** */
// handle more query opts here
const prepareFileImageContent = (
  fastify: FastifyInstance,
  fileId: string,
  filepath: string,
  imageFormat: sharp.AvailableFormatInfo | string | undefined,
  query: Query,
): Promise<Buffer> | Buffer => {
  try {
    if (!imageFormat || !_.some([query.noColor, query.width, query.height, query.quality])) {
      return readFileSync(filepath);
    }

    const task = sharp(filepath);
    const quality = query.quality && _.inRange(query.quality, 0, 101) ? query.quality : DEFAULT_QUALITY;

    if (query.noColor === true) task.grayscale();
    const resizeOptions: sharp.ResizeOptions = _.pickBy(
      {
        fit: query.fit || (query.keepAspect && 'contain'),
        width: (query.width && Math.min(MAX_WIDTH, query.width)) || null,
        height: (query.height && Math.min(MAX_HEIGHT, query.height)) || null,
        withoutEnlargement: query.noUpscale === true,
      },
      (val) => !_.isNil(val),
    );

    if (!_.isEmpty(resizeOptions)) task.resize(null, null, resizeOptions);

    return task.toFormat(imageFormat, { quality, adaptiveFiltering: true }).toBuffer();
  } catch (error) {
    fastify.log.error(
      `getFile: SHARP ${(error as Error).toString()} (fileId: ${fileId} | query: ${JSON.stringify(query)})`,
    );
    return readFileSync(filepath);
  }
};

/* ****************************************************************************************************************** */
const getImageFormat = (contentType: string) => _.find(
  ALLOWED_IMAGE_TYPES,
  (possibleContentType) => _.includes(contentType, possibleContentType),
);

/* ****************************************************************************************************************** */
const fileWhereQueryIsIncorrect = (fileWhere: FileWhere) => _.some(
  [!fileWhere.id && !fileWhere.num, fileWhere.id && !validator.isUUID(fileWhere.id)],
);

/* ****************************************************************************************************************** */
const prepareFileResponse = async (fastify: FastifyInstance, file: File, query: Query) => {
  if (!file) return null;

  let contentType = file.contentType || 'application/octet-stream';

  // sharp allows to read any image format, but can not output .gif
  let imageFormat = getImageFormat(file.contentType);
  if (imageFormat === 'jpg') imageFormat = 'jpeg';
  if (imageFormat === 'gif') {
    imageFormat = 'png';
    contentType = 'image/png';
  }
  const content = await prepareFileImageContent(fastify, file.id, file.filePath, imageFormat, query);

  return { contentType, content, cacheControl: 'max-age=31536000' };
};

/* ****************************************************************************************************************** */
const handleFileRequest = async (
  fastify: FastifyInstance,
  fileWhere: FileWhere,
  query: Query,
  response: FastifyReply<ServerResponse>,
) => {
  try {
    if (fileWhereQueryIsIncorrect(fileWhere)) {
      return response.status(404).send('Not found');
    }

    const file = await fastify.fileRepository.findOneOrFail({ where: fileWhere });
    const responseInfo = await prepareFileResponse(fastify, file, query);
    if (!responseInfo) {
      return response.status(404).send('Not found');
    }

    const encodedFileName = encodeURIComponent(file.name);
    response.header('content-type', responseInfo.contentType);
    response.header('cache-control', responseInfo.cacheControl);
    response.header(
      'content-disposition',
      `inline; filename="${encodedFileName}"; filename*=UTF-8''${encodedFileName}`,
    );

    return response.status(200).send(responseInfo.content);
  } catch (error) {
    fastify.log.error(
      `getFile: ${(error as Error).toString()} (file: ${JSON.stringify(fileWhere, null, 2)} \\ query: ${JSON.stringify(
        query,
        null,
        2,
      )})`,
    );
    return response.status(500).send('Server side error');
  }
};

/* ****************************************************************************************************************** */
export const getFile = (fastify: FastifyInstance) => fastify.route<Query>({
  method: 'GET',
  schema: {
    params: {
      type: 'object',
      properties: {
        fileUrl: { type: 'string', minLength: 1 },
      },
      additionalProperties: false,
      required: ['fileUrl'],
    },
    querystring: {
      quality: { type: 'integer' },
      noColor: { type: 'boolean' },
      width: { type: 'integer' },
      height: { type: 'integer' },
      fit: { type: 'string' },
      keepAspect: { type: 'boolean' },
      noUpscale: { type: 'boolean' },
    },
  },
  url: '/files/:fileUrl',
  handler: (request, response) => {
    const { params, query } = request;
    const { fileUrl } = params;
    const fileIdParts = _.split(fileUrl, /[-.]/, 5); // uuidWithOptionalAbracadabra.ext => uuid
    const fileId = _.join(fileIdParts, '-');
    return handleFileRequest(fastify, { id: fileId }, query, response);
  },
});

/* ****************************************************************************************************************** */
export const getImage = (fastify: FastifyInstance) => fastify.route<Query>({
  method: 'GET',
  schema: {
    params: {
      type: 'object',
      properties: {
        fileUrl: { type: 'string', minLength: 1 },
      },
      additionalProperties: false,
      required: ['fileUrl'],
    },
    querystring: {
      quality: { type: 'integer' },
      noColor: { type: 'boolean' },
      width: { type: 'integer' },
      height: { type: 'integer' },
      fit: { type: 'string' },
      keepAspect: { type: 'boolean' },
      noUpscale: { type: 'boolean' },
    },
  },
  url: '/images/:fileUrl',
  handler: (request, response) => {
    const { params, query } = request;
    fastify.log.warn(params);
    const { fileUrl } = params;
    const fileNameParts = _.split(fileUrl, /[-.]/);
    fastify.log.warn(fileUrl);
    fastify.log.warn(fileNameParts);
    const num = fileNameParts[fileNameParts.length - 2]; // take num from /(:humanReadableUrl)-(:fileId).(:ext)

    return handleFileRequest(fastify, { num: Number.parseInt(num, 10) }, query, response);
  },
});

/* ****************************************************************************************************************** */
