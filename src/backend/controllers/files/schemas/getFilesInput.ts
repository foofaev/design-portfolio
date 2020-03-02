export default filesSchema = {
  params: {
    type: 'object',
    properties: {
      fileUrl: { type: 'string', minLength: 1 },
    },
    additionalProperties: false,
    required: ['fileUrl'],
  },
  querystring: {
    quality: { type: 'integer' },
    noColor: { type: 'boolean' },
    width: { type: 'integer' },
    height: { type: 'integer' },
    fit: { type: 'string' },
    keepAspect: { type: 'boolean' },
    noUpscale: { type: 'boolean' },
  },
};
