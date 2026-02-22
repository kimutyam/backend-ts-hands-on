import * as z from 'zod';

const ErrorSchema = z
  .object({
    title: z.string().meta({
      example: 'Error Message',
    }),
  })
  .meta({ id: 'Error' });

const ValidationErrorSchema = z
  .object({
    title: z.string().meta({
      example: 'Error Message',
    }),
    issues: z.array(
      z.object({
        code: z.string().optional().meta({
          example: 'invalid_type',
        }),
        input: z.string().optional().meta({
          example: 'Invalid',
        }),
        path: z.array(z.union([z.string(), z.number(), z.string()])).meta({
          example: ['path'],
        }),
        message: z.string().meta({
          example: 'Expected number, received string',
        }),
      }),
    ),
  })
  .meta({ id: 'ValidationError' });

const createOpenApiResponse200 = <Z extends z.ZodType>(schema: Z) => ({
  200: {
    description: 'Success',
    content: {
      'application/json': {
        schema,
      },
    },
  },
});

const createOpenApiResponse201 = <Z extends z.ZodType>(schema: Z) => ({
  201: {
    description: 'Created',
    content: {
      'application/json': {
        schema,
      },
    },
  },
});

const OpenApiResponse204 = {
  204: {
    description: 'No Content',
  },
};

const OpenApiResponse400 = {
  400: {
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: ErrorSchema,
      },
    },
  },
};

const OpenApiResponse404 = {
  404: {
    description: 'Not Found',
    content: {
      'application/json': {
        schema: ErrorSchema,
      },
    },
  },
};

const OpenApiResponse409 = {
  409: {
    description: 'Conflict',
    content: {
      'application/json': {
        schema: ErrorSchema,
      },
    },
  },
};

const OpenApiResponse422 = {
  422: {
    description: 'Unprocessable Content',
    content: {
      'application/json': {
        schema: ValidationErrorSchema,
      },
    },
  },
};

const OpenApiResponse500 = {
  500: {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        schema: ErrorSchema,
      },
    },
  },
};

export {
  createOpenApiResponse200,
  createOpenApiResponse201,
  ErrorSchema,
  ValidationErrorSchema,
  OpenApiResponse204,
  OpenApiResponse400,
  OpenApiResponse404,
  OpenApiResponse409,
  OpenApiResponse422,
  OpenApiResponse500,
};
