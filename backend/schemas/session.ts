const COOKIE_SESSION_NAME: string = process.env.SESSION_COOKIE_NAME || '_sess';

const sessionHeader = {
  $id: 'sessionHeader',
  type: 'object',
  properties: {
    'Set-Cookie': {
      type: 'object',
      properties: {
        COOKIE_SESSION_NAME: 'string',
      },
      required: [COOKIE_SESSION_NAME],
    },
  },
  required: ['Set-Cookie'],
};

export {
  sessionHeader,
  COOKIE_SESSION_NAME,
};
