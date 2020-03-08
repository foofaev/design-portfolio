const PROJECT_TYPES = ['render'];

const projectTypeSchema = {
  $id: 'projectType',
  type: 'string',
  title: 'Project Type',
  description: 'Project Type',
  enum: PROJECT_TYPES,
};

const fileOutput = {
  $id: 'fileOutput',
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    num: { type: 'integer' },
    ord: { type: 'integer' },
    filePath: { type: 'string' },
    contentType: { type: 'string' },
    url: { type: 'string', minLength: 0 },
  },
  additionalProperties: false,
  required: ['id', 'num', 'ord', 'filePath', 'url', 'contentType'],
};

const projectOutput = {
  $id: 'projectOutput',
  type: 'object',
  title: 'ProjectOutput',
  description: 'ProjectOutput',
  properties: {
    id: { type: 'string', format: 'uuid' },
    type: 'projectType#',
    title: { type: 'string' },
    description: { type: 'string', minLength: 0 },
    urlKey: { type: 'string', minLength: 0 },

    ord: { type: 'integer' },

    isVisible: { type: 'boolean' },

    imageId: { anyOf: [{ type: 'string', format: 'uuid' }, { type: 'null' }] },
    imageUrl: { type: 'string', minLength: 0 },
    files: { type: 'array', items: fileOutput },
    images: { type: 'array', items: { type: 'string', format: 'url' } },

    publishedAt: { type: 'string' },
    createdAt: { type: 'string', format: 'timestamp' },
    updatedAt: { type: 'string', format: 'timestamp' },
  },
  additionalProperties: false,
};

const projectInput = {
  $id: 'projectInput',
  type: 'object',
  title: 'ProjectInput',
  description: 'ProjectInput',
  properties: {
    id: { type: 'string', format: 'uuid' },
    type: 'projectType#',
    ord: { type: 'integer' },
    title: { type: 'string' },
    description: { type: 'string', minLength: 0 },
    isVisible: { type: 'boolean' },
    publishedAt: { type: 'string' },
  },
  required: ['id', 'type', 'title', 'description', 'isVisible', 'publishedAt'],
  additionalProperties: false,
};

export {
  PROJECT_TYPES,
  projectInput,
  projectOutput,
  projectTypeSchema,
};
