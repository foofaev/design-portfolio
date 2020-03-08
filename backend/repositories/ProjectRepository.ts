import * as _ from 'lodash';
import { Repository, Not, EntityRepository } from 'typeorm';
import { toURI } from '../libs/translit';
import Project from '../entities/Project';
import FileRepository from './FileRepository';
import FileReferenceRepository from './FileReferenceRepository';

const toUrl = (str: string) => _.truncate(
  toURI(_.replace(str, /[$&_+.]/g, ' ')),
  { length: 255, omission: '' },
);

type Container = {
  fileRepository: FileRepository;
  fileReferenceRepository: FileReferenceRepository;
  [key: string]: any;
};

@EntityRepository(Project)
export default class ProjectRepository extends Repository<Project> {
  generateUrlKey(item: Project, uriPart?: number, actuallyUpdateUrlKey?: true): Promise<Project>;

  generateUrlKey(item: Project, uriPart?: number, actuallyUpdateUrlKey?: false): Promise<string>;

  async generateUrlKey(item: Project, uriPart = -1, actuallyUpdateUrlKey?: boolean): Promise<Project | string> {
    const urlKey = toUrl(`${uriPart === -1 ? '' : `${uriPart}-`}${item.title || item.id}`);

    const instanceWithSameUrlKey = await this.findOne({ where: { urlKey, id: Not(item.id) } });
    if (instanceWithSameUrlKey) return this.generateUrlKey(item, uriPart + 1);

    return actuallyUpdateUrlKey ? this.save({ ...item, urlKey }) : Promise.resolve(urlKey);
  }

  async updateMainImageId(container: Container, item: Project): Promise<Project> {
    const { fileReferenceRepository } = container;
    const mainImageRef = await fileReferenceRepository.findOneOrFail({
      where: { item },
      relations: ['file', 'item'],
      order: { ord: 'DESC' },
    });
    console.log('updateMainImageId - item', item);
    console.log('updateMainImageId - fileref', mainImageRef);

    return this.save(this.merge(item, { mainImage: mainImageRef }));
  }
}
