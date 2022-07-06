const listPublicEventsSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      type: { type: 'string' },
      actor: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          login: { type: 'string' },
          display_login: { type: 'string' },
          gravatar_id: { type: 'string' },
          url: { type: 'string' },
          avatar_url: { type: 'string' }
        }
      },
      repo: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          url: { type: 'string' }
        }
      },
      payload: {
        type: 'object'
      },
      public: { type: 'boolean' },
      created_at: { type: 'string' }
    }
  }
};

exports.listPublicEventsSchema = listPublicEventsSchema;
