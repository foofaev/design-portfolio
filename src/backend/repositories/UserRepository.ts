import { Repository, EntityRepository } from 'typeorm';
import User from '../entities/User';
import FileRepository from './FileRepository';
import FileReferenceRepository from './FileReferenceRepository';

type Container = {
  fileRepository: FileRepository,
  fileReferenceRepository: FileReferenceRepository,
  [key: string]: any
};


type RawFile = {
  path?: string,
  name: string,
  data?: Buffer,
  contentType?: string,
  ext?: string,
};


@EntityRepository(User)
export default class ProjectRepository extends Repository<User> {
  async updateImage(container: Container, userId: string, rawFileRequest: RawFile) {
    if (!rawFileRequest) {
      throw new Error('File does not exist');
    }

    const { fileReferenceRepository, fileRepository } = container;

    const instance = await this.findOneOrFail(userId);
    const file = await fileRepository.createFromFileIfNotExists(rawFileRequest);

    await this.removeImage(container, userId);

    const newFileref = await fileReferenceRepository.createWithFile(file, {
      item: instance,
      itemType: 'user',
      purpose: 'photo',
    });

    return this.update(userId, { image: newFileref });
  }

  async removeImage(container: Container, userId: string) {
    const { fileReferenceRepository } = container;

    const fileref = await fileReferenceRepository.findOne({ where: { itemId: userId, itemType: 'user', purpose: 'photo' } });
    if (!fileref) return;

    await fileReferenceRepository.remove(fileref);

    // TODO:
    // await File.destroyByIdIfNotReferenced(fileId);
  }
}
