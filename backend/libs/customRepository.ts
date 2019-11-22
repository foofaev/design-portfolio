import * as _ from 'lodash';
import { Repository, Not, EntityRepository } from 'typeorm';
import { toURI } from './translit';

const toUrl = (str: string) => _.truncate(
  toURI(_.replace(str, /[$&_+.]/g, ' ')),
  { length: 255, omission: '' },
);

type Instance = {
  name: string,
  id: string,
  urlKey: string,
};

export default (entity: Instance) => {
  @EntityRepository(entity)
  class RepoBase<T extends Instance> extends Repository<T> {
    public generateUrlKey = async (item: T, uriPart = -1, actuallyUpdateUrlKey: boolean | void): Promise<any> => {
      const urlKey = toUrl(`${uriPart === -1 ? '' : `${uriPart}-`}${item.name || item.id}`);

      const instanceWithSameUrlKey = await this.findOne({ where: { urlKey, id: Not(item.id) } });
      if (instanceWithSameUrlKey) return this.generateUrlKey(item, uriPart + 1);

      return actuallyUpdateUrlKey ? this.manager.save({ ...item, urlKey }) : Promise.resolve(urlKey);
    };
  }

  return RepoBase;
};
