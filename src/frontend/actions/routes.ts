import { Paging } from '../types';

const HOST = process.env.HOST || '';

const buildPaging = ({ offset, limit }: Paging) => `?offset=${offset}&limit=${limit}`;

export default {
  projectsUrl: (paging: Paging): string => [HOST, 'api', `projects${buildPaging(paging)}`].join('/'),
  projectUrl: (urlKey: string | void = ''): string => [HOST, 'api', 'projects', urlKey].join('/'),
  projectImageUrl: ({ id, fileId = '' }: { id: string; fileId?: string }): string => [HOST, 'api', 'projects', 'image', id, fileId].join('/'),

  login: (): string => [HOST, 'api', 'session'].join('/'),
};
