import * as path from 'path';
import * as fs from 'fs';
import { createHash } from 'crypto';
import * as _ from 'lodash';
import * as sharp from 'sharp';
import { Repository, EntityRepository, ObjectLiteral } from 'typeorm';
import File from '../entities/File';

import helpers from '../libs/helpers';

const fileStoragePath = process.env.FILES_PATH || path.join(__dirname, '../../.storage/');

type RawFile = {
  path?: string;
  name: string;
  data?: Buffer;
  headers?: ObjectLiteral;
  contentType?: string;
  ext?: string;
};

type PreviewParams = {
  width: number;
  height: number;
  left: number;
  top: number;
};

@EntityRepository(File)
export default class FileRepository extends Repository<File> {
  async createFromFileIfNotExists(rawFileRequest: RawFile): Promise<File> {
    if (!fs.existsSync(fileStoragePath)) fs.mkdirSync(fileStoragePath, { recursive: true });

    const fileData = rawFileRequest.path
      ? fs.readFileSync(rawFileRequest.path)
      : rawFileRequest.data;

    if (!fileData) {
      throw new Error(`File.createFromFileIfNotExists missing fileData ${JSON.stringify(rawFileRequest, null, 2)}`);
    }

    const md5 = createHash('md5').update(fileData).digest('hex');
    const existingFile = await this.findOne({ where: { md5 } });
    if (existingFile) return existingFile;

    const ext = rawFileRequest.ext || helpers.getExtension(rawFileRequest.contentType, rawFileRequest.path);

    const filePath = path.join(fileStoragePath, `${md5}.${ext}`);
    const creationData: Partial<File> = {
      md5,
      name: rawFileRequest.name,
      size: Buffer.byteLength(fileData),
      contentType: _.get(rawFileRequest, 'headers.content-type') as string
        || rawFileRequest.contentType
        || 'application/octet-stream',
      filePath,
    };
    fs.writeFileSync(filePath, fileData);
    return this.save(creationData);
  }

  async createPreviewFromFile(rawFileRequest: RawFile, previewParams: PreviewParams | void): Promise<File> {
    if (!fs.existsSync(fileStoragePath)) fs.mkdirSync(fileStoragePath, { recursive: true });

    const fileData = rawFileRequest.path
      ? fs.readFileSync(rawFileRequest.path)
      : rawFileRequest.data;

    if (!fileData) {
      throw new Error(`File.createPreviewFromFile missing fileData ${JSON.stringify(rawFileRequest, null, 2)}`);
    }
    const image = sharp(fileData).rotate().clone();
    if (previewParams) image.extract(previewParams);
    const resizeOptions: sharp.ResizeOptions = {
      fit: 'contain',
      background: {
        r: 255, g: 255, b: 255, alpha: 1,
      },
    };
    if (!previewParams) resizeOptions.position = 'centre';
    const previewFileData = await image
      .resize(800, 484, resizeOptions)
      .jpeg()
      .toBuffer();

    const md5 = createHash('md5').update(previewFileData).digest('hex');
    const existingFile = await this.findOne({ where: { md5 } });
    if (existingFile) return existingFile;

    const filePath = path.join(fileStoragePath, `${md5}.jpeg`);
    const creationData: Partial<File> = {
      md5,
      name: rawFileRequest.name,
      size: Buffer.byteLength(previewFileData),
      contentType: 'image/jpeg',
      filePath,
    };
    fs.writeFileSync(filePath, fileData, 'utf8');
    return this.save(creationData);
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
    // TODO: предыдущий и записывать новый иначе id не поменяется.
    return fileId ? `/getFile?id=${fileId}` : '';
  }
}
