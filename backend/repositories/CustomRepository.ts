import * as _ from 'lodash';
import {
  Repository,
  Not,
  EntityRepository,
  DeepPartial,
} from 'typeorm';
import { toURI } from '../libs/translit';
import Project from '../entities/Project'; // #TODO: use generic

const toUrl = (str: string) => _.truncate(
  toURI(_.replace(str, /[$&_+.]/g, ' ')),
  { length: 255, omission: '' },
);

interface Instance extends DeepPartial<Project> {
  name?: string,
}

export default (entity: typeof Project) => {
  @EntityRepository(entity)
  class CustomRepository extends Repository<Instance> {
    async generateUrlKey(item: Instance, uriPart = -1, actuallyUpdateUrlKey: boolean | void): Promise<any> {
      const urlKey = toUrl(`${uriPart === -1 ? '' : `${uriPart}-`}${item.title || item.name || item.id}`);

      const instanceWithSameUrlKey = await this.findOne({ where: { urlKey, id: Not(item.id) } });
      if (instanceWithSameUrlKey) return this.generateUrlKey(item, uriPart + 1);

      return actuallyUpdateUrlKey ? this.save({ ...item, urlKey }) : Promise.resolve(urlKey);
    }
  }

  return CustomRepository;
};
