const userOutput = {
  $id: 'userOutput',
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string', minLength: 0 },

    imageId: { anyOf: [{ type: 'string', format: 'uuid' }, { type: 'null' }] },
    imageUrl: { type: 'string', minLength: 0 },

    createdAt: { type: 'string', format: 'timestamp' },
    updatedAt: { type: 'string', format: 'timestamp' },
  },
  additionalProperties: false,
};

const userInput = {
  $id: 'userInput',
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    firstName: { type: 'string' },
    lastName: { type: 'string', minLength: 0 },
  },
  required: [],
  additionalProperties: false,
};

export {
  userInput,
  userOutput,
};
