import { z } from '@hono/zod-openapi';

const createErrorSchema = (exampleTitle = 'Error') =>
  z
    .object({
      title: z.string().meta({
        example: exampleTitle,
      }),
    })
    .meta({ id: 'Error' });

const createValidationErrorSchema = (exampleTitle = 'ValidationError') =>
  z.object({
    title: z.string().meta({
      example: exampleTitle,
    }),
    issues: z
      .array(
        z.object({
          code: z.string().optional().meta({
            example: 'invalid_type',
          }),
          input: z.string().optional().meta({
            example: 'Invalid',
          }),
          path: z.array(z.union([z.string(), z.number(), z.string()])).meta({
            example: ['age'],
          }),
          message: z.string().meta({
            example: 'Expected number, received string',
          }),
        }),
      )
      .meta({ id: 'ValidationError' }),
  });

export { createErrorSchema, createValidationErrorSchema };
