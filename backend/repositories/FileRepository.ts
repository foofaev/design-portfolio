import * as path from 'path';
import * as fs from 'fs';
import { createHash } from 'crypto';
import * as _ from 'lodash';
import {
  Repository, EntityRepository, ObjectLiteral, DeepPartial,
} from 'typeorm';
import File from '../entities/File';

const filesPath = process.env.FILES_PATH || path.join();

type RawFile = {
  path?: string,
  name: string,
  body?: Buffer,
  headers?: ObjectLiteral,
  contentType?: string,
};

@EntityRepository(File)
export default class FileRepository<T extends File> extends Repository<File> {
  async createFromFileIfNotExists(rawFileRequest: RawFile): Promise<File | void | null> {
    if (!rawFileRequest) return null;

    const fileData = rawFileRequest.path
      ? fs.readFileSync(rawFileRequest.path, 'utf8')
      : rawFileRequest.body;

    if (!fileData) {
      throw new Error(`File.createFromFileIfNotExists missing fileData ${JSON.stringify(rawFileRequest, null, 2)}`);
    }

    const md5 = createHash('md5').update(fileData).digest('hex');
    if (rawFileRequest.path) fs.unlinkSync(rawFileRequest.path);
    const existingFile = await this.findOne({ where: { md5 } });
    if (!_.isEmpty(existingFile)) return existingFile;

    const filePath = path.join(filesPath, md5);
    const creationData: DeepPartial<File> = {
      md5,
      name: rawFileRequest.name,
      size: Buffer.byteLength(fileData),
      contentType: _.get(rawFileRequest, 'headers.content-type')
        || rawFileRequest.contentType
        || 'application/octet-stream',
      filePath,
    };
    fs.writeFileSync(filePath, fileData, 'utf8');
    return this.create(creationData);
  }

  // destroyByIdIfNotReferenced(_id: string) {
  //   if(!_id) return Promise.resolve();
  //   return getReferencesCount(_id, this)
  //     .then(result => {
  //       if(result === 0) return this.destroy({where: {_id}});
  //     });
  // },
  // destroyByIdsIfNotReferenced(ids) {
  //   return Promise.mapSeries(
  //     ids || [],
  //     _id => this.destroyByIdIfNotReferenced(_id)
  //   );
  // },

  generateURL(fileId: string) {
    // TODO: Получается, что при изменении файла нужно обязательно удалять
    // TODO: предыдуший и записывать новый иначе id не поменяется.
    return fileId ? `/getFile?id=${fileId}` : '';
  }
}
