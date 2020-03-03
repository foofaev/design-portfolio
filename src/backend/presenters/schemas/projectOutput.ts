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

export default projectOutput;
