import * as _ from 'lodash';
import { extension } from 'mime-types';
import { Repository, EntityRepository, ObjectLiteral } from 'typeorm';

import File from '../entities/File';
import FileReference from '../entities/FileReference';

function getExtension(contentType: string, filepath: string) {
  const getExtensionByContentType = () => contentType && extension(contentType);
  const getExtensionByOriginalFilename = () => {
    const originalFilenameParts = _.split(filepath, '.');
    return _.size(originalFilenameParts) > 1 && _.last(originalFilenameParts);
  };
  return getExtensionByContentType() || getExtensionByOriginalFilename() || '';
}

function buildExtendedFileUrl(id: string, urlKey: string, extensionType: string) {
  return `/files/${id}${urlKey ? `-${urlKey}` : ''}${extensionType ? `.${extensionType}` : ''}`;
}

function buildExtendedImageUrl(num: number, urlKey: string, extensionType: string) {
  return `/images/${urlKey ? `${urlKey}-` : ''}${num}${extensionType ? `.${extensionType}` : ''}`;
}

@EntityRepository(FileReference)
export default class FileReferenceRepository extends Repository<FileReference> {
  async createWithFile(file: File, data: Partial<FileReference>) {
    const { id: fileId, contentType, filePath } = file;
    if (!fileId || _.isUndefined(contentType)) {
      throw new Error(`FileRef.createWithFile missing fileData ${fileId} | ${contentType}`);
    }
    return this.save({
      ...data,
      file,
      filePath,
      contentType,
    });
  }

  async generateExtendedURL(fileRef: FileReference, record: ObjectLiteral) {
    const {
      file,
      num,
      contentType,
      filePath,
    } = fileRef;

    if (!file && !num) return '';
    const { urlKey } = record;
    const extensionType = getExtension(contentType, filePath);
    const isImage = _.includes(['gif', 'jpg', 'png', 'jpeg'], extensionType);
    return isImage && num
      ? buildExtendedImageUrl(num, urlKey, extensionType)
      : buildExtendedFileUrl(file.id, urlKey, extensionType);
  }
}
