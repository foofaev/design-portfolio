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

export default projectInput;
