const PROJECT_TYPES = ['render'];

const projectTypeSchema = {
  $id: 'projectType',
  type: 'string',
  title: 'Project Type',
  description: 'Project Type',
  enum: PROJECT_TYPES,
};

export default projectTypeSchema;
