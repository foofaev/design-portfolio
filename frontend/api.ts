import { Paging } from './types';

const HOST = process.env.HOST || 'localhost';

const buildPaging = ({ offset, limit }: Paging) => `?offset=${offset}&limit=${limit}`;

export default {
  projectsUrl: (paging: Paging) => [HOST, 'api', 'projects', buildPaging(paging)].join('/'),
  projectUrl: (id: string | void = '') => [HOST, 'api', 'projects', id].join('/'),
  projectImageUrl: ({ id, fileId = '' }: { id: string, fileId?: string }) => [HOST, 'api', 'projects', 'image', id, fileId].join('/'),

  login: () => [HOST, 'api', 'session'].join('/'),
};
