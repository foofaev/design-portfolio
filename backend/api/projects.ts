/* ****************************************************************************************************************** */
import { FastifyInstance, FastifyRequest, DefaultQuery, DefaultHeaders, DefaultParams } from 'fastify';
import { projectsToJSON } from '../libs/toJSON';
import Project from '../entities/Project';
/* ****************************************************************************************************************** */

/* ****************************************************************************************************************** */
type Params = { urlKey: string };

/* ****************************************************************************************************************** */
type GetProjectsQuery = {
  limit: number;
  offset: number;
};

const index = (fastify: FastifyInstance) => fastify.route<GetProjectsQuery>({
  method: 'GET',
  url: '/api/projects',
  schema: {
    querystring: {
      type: 'object',
      properties: {
        limit: { type: 'number' },
        offset: { type: 'number' },
      },
      required: ['limit', 'offset'],
      additionalProperties: false,
    },
    response: {
      200: {
        type: 'object',
        properties: {
          projects: { type: 'array', items: 'projectOutput#' },
        },
      },
    },
  },
  preHandler: fastify.checkSession(),
  handler: async (request) => {
    const { offset: skip, limit: take } = request.query;
    const projects = await fastify
      .projectRepository
      .find({ relations: ['mainImage', 'images', 'draft'], skip, take })
      .then((projectsRaw) => projectsToJSON(fastify, projectsRaw));
    return { projects };
  },
});

/* ****************************************************************************************************************** */
const show = (fastify: FastifyInstance) => fastify.route<DefaultQuery, Params, DefaultHeaders>({
  method: 'GET',
  url: '/api/projects/:urlKey',
  schema: {
    params: {
      type: 'object',
      properties: {
        urlKey: { type: 'string' },
      },
      additionalProperties: false,
      required: ['urlKey'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          project: 'projectOutput#',
        },
        additionalProperties: false,
      },
    },
  },
  preHandler: fastify.checkSession(),
  handler: (request) => {
    const { urlKey } = request.params;
    return fastify
      .projectRepository
      .findOneOrFail({ urlKey }, { relations: ['mainImage', 'images', 'draft'] })
      .then((projectRaw) => projectsToJSON(fastify, projectRaw))
      .then((project) => ({ project }));
  },
});

/* ****************************************************************************************************************** */
type SaveProjectBody = {
    title: string;
    description: string;
    isVisible: boolean;
    ord?: null;
    publishedAt?: string;
};

const save = (fastify: FastifyInstance) => fastify
  .route<DefaultQuery, DefaultParams, DefaultHeaders, SaveProjectBody>({
    method: 'PUT',
    url: '/api/projects',
    schema: {
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          isVisible: { type: 'boolean' },
          ord: { type: 'integer' },
          publishedAt: { type: 'string' },
        },
        required: ['title', 'description', 'isVisible'],
        additionalProperties: false,
      },
      response: {
        200: {
          type: 'object',
          properties: {
            project: 'projectOutput#',
          },
          additionalProperties: false,
        },
      },
    },
    preHandler: fastify.checkSession(true),
    handler: async (request) => {
      const { projectRepository } = fastify;
      const { body } = request;

      const saved = await projectRepository.save(body as Partial<Project>);
      await projectRepository.generateUrlKey(saved, -1, true);
      return projectRepository
        .findOneOrFail(saved.id, { relations: ['mainImage', 'images', 'draft'] })
        .then((projectsRaw: Project) => projectsToJSON(fastify, projectsRaw))
        .then((project) => ({ project }));
    },
  });

/* ****************************************************************************************************************** */
type UpdateProjectParams = {
  id: string;
};

type UpdateProjectBody = {
    title?: string;
    description?: string;
    isVisible?: boolean;
    ord?: null;
    publishedAt?: string;
};

const update = (fastify: FastifyInstance) => fastify
  .route<DefaultQuery, UpdateProjectParams, DefaultHeaders, UpdateProjectBody>({
    method: 'PATCH',
    url: '/api/projects/:id',
    schema: {
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          ord: { type: 'integer' },
          description: { type: 'string' },
          isVisible: { type: 'boolean' },
          publishedAt: { type: 'string' },
        },
        additionalProperties: false,
      },
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', minLength: 1 },
        },
        additionalProperties: false,
        required: ['id'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            project: 'projectOutput#',
          },
          additionalProperties: false,
        },
      },
    },
    preHandler: fastify.checkSession(true),
    handler: async (request) => {
      const { projectRepository } = fastify;
      const { body, params: { id } } = request;

      await projectRepository.update(id, body as Partial<Project>);
      return projectRepository
        .findOneOrFail(id, { relations: ['mainImage', 'images', 'draft'] })
        .then((projectsRaw: Project) => projectsToJSON(fastify, projectsRaw))
        .then((project) => ({ project }));
    },
  });

/* ****************************************************************************************************************** */
type RemoveProjectParams = {
  urlKey: string;
};

const remove = (fastify: FastifyInstance) => fastify
  .route<DefaultQuery, RemoveProjectParams>({
    method: 'DELETE',
    url: '/api/projects/:urlKey',
    schema: {
      params: {
        type: 'object',
        properties: {
          urlKey: { type: 'string', minLength: 1 },
        },
        additionalProperties: false,
        required: ['urlKey'],
      },
      response: {
        200: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
      },
    },
    preHandler: fastify.checkSession(true),
    handler: async (request) => {
      const { projectRepository } = fastify;
      const { params: { urlKey } } = request;

      await projectRepository.delete({ urlKey });
      return {};
    },
  });

/* ****************************************************************************************************************** */
type SaveProjectImageParams = {
  projectId: string;
};

type SaveProjectImageBody = {
  file: { filename: string; mimetype: string; data: Buffer } [];
  ord: number;
};

const saveProjectImage = (fastify: FastifyInstance): FastifyInstance => fastify
  .route<DefaultQuery, SaveProjectImageParams, DefaultHeaders, SaveProjectImageBody>({
    method: 'PATCH',
    url: '/api/projects/image/:projectId',
    schema: {
      body: {
        type: 'object',
        properties: {
          ord: { type: 'integer' },
          file: { type: 'array', items: 'rawFileSchema#' },
        },
        required: ['file', 'ord'],
        additionalProperties: false,
      },
      params: {
        type: 'object',
        properties: {
          projectId: { type: 'string', minLength: 1 },
        },
        additionalProperties: false,
        required: ['projectId'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            project: 'projectOutput#',
          },
          additionalProperties: false,
        },
      },
    },
    preHandler: fastify.checkSession(true),
    handler: async (request) => {
      const { projectRepository, fileRepository, fileReferenceRepository } = fastify;
      const { body, params: { projectId } } = request;
      const rawFile = body.file[0];
      const fileData = { name: rawFile.filename, contentType: rawFile.mimetype, data: rawFile.data };

      const [project, file] = await Promise.all([
        projectRepository.findOneOrFail(projectId),
        fileRepository.createFromFileIfNotExists(fileData),
      ]);

      await fileReferenceRepository.createWithFile(
        file,
        { item: project, itemType: 'project', purpose: 'file', ord: body.ord },
      );

      await projectRepository.updateMainImageId(fastify, project);

      return projectRepository
        .findOneOrFail(projectId, { relations: ['mainImage', 'images', 'draft'] })
        .then((projects) => projectsToJSON(fastify, projects))
        .then((projectWithImage) => ({ project: projectWithImage }));
    },
  });

/* ****************************************************************************************************************** */
type UpdateProjectImageOrdBody = {
  ord: number;
};

type UpdateProjectImageOrdParams = {
  projectId: string;
  fileId: string;
};

const updateProjectImageOrd = (fastify: FastifyInstance) => fastify
  .route<DefaultQuery, UpdateProjectImageOrdParams, DefaultHeaders, UpdateProjectImageOrdBody>({
    method: 'PATCH',
    url: '/api/projects/image/:projectId/:fileId',
    schema: {
      body: {
        type: 'object',
        properties: {
          ord: { type: 'integer' },
        },
        required: ['ord'],
        additionalProperties: false,
      },
      params: {
        type: 'object',
        properties: {
          projectId: { type: 'string', format: 'uuid' },
          fileId: { type: 'string', format: 'uuid' },
        },
        additionalProperties: false,
        required: ['projectId', 'fileId'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            project: 'projectOutput#',
          },
          additionalProperties: false,
        },
      },
    },
    preHandler: fastify.checkSession(true),
    handler: async (request) => {
      const { projectRepository, fileReferenceRepository } = fastify;
      const { body: { ord }, params: { projectId, fileId } } = request;

      const project = await projectRepository.findOneOrFail(projectId);

      await fileReferenceRepository.update(fileId, { ord });
      await projectRepository.updateMainImageId(fastify, project);

      const updated = await projectRepository
        .findOneOrFail(projectId, { relations: ['mainImage', 'images', 'draft'] })
        .then((projects) => projectsToJSON(fastify, projects));

      return { project: updated };
    },
  });

/* ****************************************************************************************************************** */
const removeProjectImage = (fastify: FastifyInstance) => fastify.route({
  method: 'DELETE',
  url: '/api/projects/image/:projectId/:fileId',
  schema: {
    params: {
      type: 'object',
      properties: {
        projectId: { type: 'string', format: 'uuid' },
        fileId: { type: 'string', format: 'uuid' },
      },
      additionalProperties: false,
      required: ['projectId', 'fileId'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          project: 'projectOutput#',
        },
        additionalProperties: false,
      },
    },
  },
  preHandler: fastify.checkSession(true),
  handler: async (request) => {
    const { projectRepository, fileReferenceRepository } = fastify;
    const { params: { projectId, fileId: fileRefId } } = request;

    const project = await projectRepository.findOneOrFail(projectId);
    const fileref = await fileReferenceRepository.findOneOrFail(fileRefId);

    // TODO: remove file if not referenced
    await fileReferenceRepository.remove(fileref);

    await projectRepository.updateMainImageId(fastify, project);
    const updated = await projectRepository
      .findOneOrFail(projectId, { relations: ['mainImage', 'images', 'draft'] })
      .then((projects) => projectsToJSON(fastify, projects));
    return { project: updated };
  },
});

// TODO: buildRelations() =>
/* ****************************************************************************************************************** */
export {
  index,
  show,
  save,
  remove,
  update,
  saveProjectImage,
  updateProjectImageOrd,
  removeProjectImage,
};

/* ****************************************************************************************************************** */
