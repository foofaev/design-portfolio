import { Paging } from '../types';

const HOST = process.env.HOST || '';

const buildPaging = ({ offset, limit }: Paging) => `?offset=${offset}&limit=${limit}`;

export default {
  projectsUrl: (paging: Paging) => [HOST, `projects${buildPaging(paging)}`].join('/'),
  projectUrl: (id: string | void = '') => [HOST, 'projects', id].join('/'),
  projectImageUrl: ({ id, fileId = '' }: { id: string, fileId?: string }) => [HOST, 'projects', 'image', id, fileId].join('/'),

  login: () => [HOST, 'session'].join('/'),
};
