import _ from 'lodash';
import { Repository, EntityRepository, ObjectLiteral } from 'typeorm';
import helpers from '../libs/helpers';

import File from '../entities/File';
import FileReference from '../entities/FileReference';

function buildExtendedFileUrl(id: string, urlKey: string, extensionType: string): string {
  return `/files/${id}${urlKey ? `-${urlKey}` : ''}${extensionType ? `.${extensionType}` : ''}`;
}

function buildExtendedImageUrl(num: number, urlKey: string, extensionType: string): string {
  return `/images/${urlKey ? `${urlKey}-` : ''}${num}${extensionType ? `.${extensionType}` : ''}`;
}

@EntityRepository(FileReference)
export default class FileReferenceRepository extends Repository<FileReference> {
  async createWithFile(file: File, data: Partial<FileReference>): Promise<FileReference> {
    const { id: fileId, num, contentType, filePath } = file;
    if (!fileId || !num || _.isUndefined(contentType)) {
      throw new Error(`FileRef.createWithFile missing fileData ${fileId} | ${num} | ${contentType}`);
    }
    const existingRef = await this.findOne({ item: data.item, file });
    if (existingRef) return existingRef;
    return this.save({
      ...data,
      num,
      file,
      filePath,
      contentType,
    });
  }

  generateExtendedURL(fileRef: FileReference, record: ObjectLiteral): string {
    const {
      file,
      num,
      contentType,
      filePath,
    } = fileRef;

    if (!file && !num) return '';
    const { urlKey } = record;
    const extensionType = helpers.getExtension(contentType, filePath);
    const isImage = _.includes(['gif', 'jpg', 'png', 'jpeg'], extensionType);
    return isImage && num
      ? buildExtendedImageUrl(num, urlKey, extensionType)
      : buildExtendedFileUrl(file.id, urlKey, extensionType);
  }
}
