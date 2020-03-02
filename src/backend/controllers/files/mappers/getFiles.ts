import _ from 'lodash';
import validator from 'validator';
import { Query, Params } from '../intefaces/getFiles';
import { FileWhere, ImageParams } from '../../../services/files/interfaces/getFiles';

/* ****************************************************************************************************************** */

/* extendedFileUrl = `/files/${id}${urlKey ? `-${urlKey}` : ''}${extensionType ? `.${extensionType}` : ''}` */
/* extendedImageUrl =  `/images/${urlKey ? `${urlKey}-` : ''}${num}${extensionType ? `.${extensionType}` : ''}` */


/* ****************************************************************************************************************** */

const DEFAULT_QUALITY = 80;
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;

/* ****************************************************************************************************************** */
const fileUrlToId = _.flow(
  (fileUrl) => _.split(fileUrl, /[-.]/, 5),
  (fileIdParts) => _.join(fileIdParts, '-'),
  (id) => ({ id }),
);

/* ****************************************************************************************************************** */
const fileUrlToNum = _.flow(
  (fileUrl) => _.split(fileUrl, /[-.]/),
  (fileNameParts) => fileNameParts[fileNameParts.length - 2],
  (num) => ({ num: Number.parseInt(num, 10) }),
);

/* ****************************************************************************************************************** */
const fileWhereQueryIsIncorrect = (fileWhere: FileWhere): boolean => _.some([
  !fileWhere.id && !fileWhere.num,
  fileWhere.id && !validator.isUUID(fileWhere.id),
]);

/* ****************************************************************************************************************** */
const mapGetFileParamsToImageParams = (
  params: Params,
  query: Query,
  isFile: boolean,
): { fileWhere?: FileWhere; imageParams?: ImageParams } => {
  const { fileUrl } = params;
  const fileWhere = isFile ? fileUrlToId(fileUrl) : fileUrlToNum(fileUrl);

  if (fileWhereQueryIsIncorrect(fileWhere)) return {};

  const imageParams = {
    ...(query.fit || !!query.keepAspect) && { fit: query.fit || 'contain' },
    ...query.width && { width: Math.min(MAX_WIDTH, query.width) },
    ...query.height && { height: Math.min(MAX_HEIGHT, query.height) },
    withoutEnlargement: query.noUpscale === true,
    quality: (query.quality && _.inRange(query.quality, 0, 101))
      ? query.quality
      : DEFAULT_QUALITY,
    noColor: query.noColor === true,
  };

  return { fileWhere, imageParams };
};

/* ****************************************************************************************************************** */
export default mapGetFileParamsToImageParams;

/* ****************************************************************************************************************** */
