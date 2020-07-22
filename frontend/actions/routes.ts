/* ****************************************************************************************************************** */

import compact from 'lodash/compact';
import { Paging } from '../types';

/* ****************************************************************************************************************** */
const HOST = process.env.HOST || '';

/* ****************************************************************************************************************** */
const buildPaging = ({ offset, limit }: Paging) => `?offset=${offset}&limit=${limit}`;

/* ****************************************************************************************************************** */
export default {
  projectsUrl: (paging: Paging): string => [HOST, 'api', `projects${buildPaging(paging)}`].join('/'),
  projectUrl: (urlKey: string | void = ''): string => [HOST, 'api', 'projects', urlKey].join('/'),
  projectImageUrl: ({ id, fileId = '' }: { id: string; fileId?: string }): string => compact([HOST, 'api', 'projects', 'image', id, fileId]).join('/'),

  login: (): string => [HOST, 'api', 'session'].join('/'),
  checkSessionUrl: (): string => [HOST, 'api', 'session', 'check'].join('/'),
  userUrl: (): string => [HOST, 'api', 'user'].join('/'),
  userImageUrl: (): string => [HOST, 'api', 'user', 'image'].join('/'),
  changePassword: (): string => [HOST, 'api', 'user', 'password'].join('/'),

  imageByParams: (url: string, width: number, height: number): string => `${url}?noUpscale=true&keepAspect=true&width=${width}&height=${height}`,
  parallaxImageUrl: (url: string, width: number, height: number): string => `${url}?noUpscale=true&fit=cover&width=${width}&height=${height}`,
  previewImageUrl: (url: string): string => `${url}?noUpscale=true&fit=contain&width=400`,
};

/* ****************************************************************************************************************** */
