import type { z } from 'zod';

import { ErrorSchema, ValidationErrorSchema } from './errorSchemas.js';

const createSpec200 = <Z extends z.ZodType>(schema: Z) => ({
  200: {
    description: 'Success',
    content: {
      'application/json': {
        schema,
      },
    },
  },
});

const createSpec201 = <Z extends z.ZodType>(schema: Z) => ({
  201: {
    description: 'Created',
    content: {
      'application/json': {
        schema,
      },
    },
  },
});

const Spec204 = {
  204: {
    description: 'No Content',
  },
};

const Spec400 = {
  400: {
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: ErrorSchema,
      },
    },
  },
};

const Spec404 = {
  404: {
    description: 'Not Found',
    content: {
      'application/json': {
        schema: ErrorSchema,
      },
    },
  },
};

const Spec409 = {
  409: {
    description: 'Conflict',
    content: {
      'application/json': {
        schema: ErrorSchema,
      },
    },
  },
};

const Spec422 = {
  422: {
    description: 'Unprocessable Content',
    content: {
      'application/json': {
        schema: ValidationErrorSchema,
      },
    },
  },
};

const Spec500 = {
  500: {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        schema: ErrorSchema,
      },
    },
  },
};

const OpenApiResponseSpec = {
  create200: createSpec200,
  create201: createSpec201,
  204: Spec204,
  400: Spec400,
  404: Spec404,
  409: Spec409,
  422: Spec422,
  500: Spec500,
} as const;

export { OpenApiResponseSpec };
