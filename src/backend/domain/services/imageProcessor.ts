/* ****************************************************************************************************************** */

import { readFileSync } from 'fs';
import * as _ from 'lodash';
import * as sharp from 'sharp';

import { FastifyInstance } from 'fastify';
import { FileWhere, ImageParams, FileOutput } from '../interfaces/getFiles';

/* ****************************************************************************************************************** */

const ALLOWED_IMAGE_TYPES = ['gif', 'jpg', 'png', 'jpeg'];

/* ****************************************************************************************************************** */
const getImageFormat = (contentType: string): string | undefined => _.find(
  ALLOWED_IMAGE_TYPES,
  (possibleContentType) => _.includes(contentType, possibleContentType),
);

/* ****************************************************************************************************************** */
const getContentTypeAndImageFormat = (fileContentType: string): { imageFormat: string; contentType: string } => {
  // sharp allows to read any image format, but can not output .gif
  const contentType = fileContentType || 'application/octet-stream';
  const imageFormat = getImageFormat(contentType) || '';
  if (imageFormat === 'jpg') return { imageFormat: 'jpeg', contentType };
  if (imageFormat === 'gif') return { imageFormat: 'png', contentType: 'image/png' };
  return { imageFormat, contentType };
};

/* ****************************************************************************************************************** */
const getFile = async (fastify: FastifyInstance, where: FileWhere, imageParams: ImageParams): Promise<FileOutput> => {
  const file = await fastify.fileRepository.findOneOrFail({ where });
  const { filePath, id: fileId, name } = file;
  const { imageFormat, contentType } = getContentTypeAndImageFormat(file.contentType);

  try {
    if (!imageFormat) {
      return { content: readFileSync(filePath), contentType, name };
    }

    const task = sharp(filePath);

    if (imageParams.noColor === true) task.grayscale();
    const resizeOptions: sharp.ResizeOptions = _.pick(imageParams, ['fit', 'weight', 'height', 'withoutEnlargement']);

    if (!_.isEmpty(resizeOptions)) task.resize(null, null, resizeOptions);

    const content = await task
      .toFormat(imageFormat, { quality: imageParams.quality, adaptiveFiltering: true })
      .toBuffer();
    return { content, contentType, name };
  } catch (error) {
    fastify.log.error(`getFile: SHARP ${error} (fileId: ${fileId} | params: ${JSON.stringify(imageParams)})`);
    return { content: readFileSync(filePath), name, contentType };
  }
};

/* ****************************************************************************************************************** */
export {
  getFile, // eslint-disable-line import/prefer-default-export
};

/* ****************************************************************************************************************** */
