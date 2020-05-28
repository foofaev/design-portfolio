import { FastifyInstance } from 'fastify';
import { Repository, EntityRepository, UpdateResult } from 'typeorm';
import User from '../entities/User';

type Container = Pick<FastifyInstance, 'fileRepository' | 'fileReferenceRepository'>;

type RawFile = {
  path?: string;
  name: string;
  data?: Buffer;
  contentType?: string;
  ext?: string;
};


@EntityRepository(User)
export default class ProjectRepository extends Repository<User> {
  async updateImage(container: Container, userId: string, rawFileRequest: RawFile): Promise<UpdateResult> {
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

  async removeImage(container: Container, userId: string): Promise<void> {
    const { fileReferenceRepository } = container;

    const fileref = await fileReferenceRepository.findOne({ where: { itemId: userId, itemType: 'user', purpose: 'photo' } });
    if (!fileref) return;

    await fileReferenceRepository.remove(fileref);

    // TODO:
    // await File.destroyByIdIfNotReferenced(fileId);
  }
}
