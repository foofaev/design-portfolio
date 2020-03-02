import { FastifyInstance } from 'fastify';
import * as _ from 'lodash';
import Project, { ProjectType } from '../../../entities/Project';
import FileReference from '../../../entities/FileReference';

class ProjectDto {
  id: string;

  title: string;

  description: string;

  urlKey: string;

  isVisible: boolean;

  type: ProjectType;

  publishedAt: string | null;

  imageId?: string;

  imageUrl?: string;

  images?: string[];

  fileIds?: string[];

  files: FileReference[];

  ord: number;

  createdAt: string;

  updatedAt: string;

  constructor(fastify: FastifyInstance, { image, files: fileRefs, ...project }: Project) {
    const { fileReferenceRepository } = fastify;
    this.imageId = _.get(image, 'id', '');
    this.imageUrl = image ? fileReferenceRepository.generateExtendedURL(image, project) : '';

    this.files = _.map(
      _.orderBy(fileRefs, ['ord'], ['desc']),
      (fileRef) => ({
        ..._.pick(fileRef, ['id', 'num', 'filePath', 'ord', 'contentType']),
        url: fileReferenceRepository.generateExtendedURL(fileRef, project),
      }),
    );
    _.defaults(this, project);
  }
}

export default ProjectDto;
