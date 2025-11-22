import { z } from '@hono/zod-openapi';

const createErrorSchema = (exampleTitle = 'Error') =>
  z
    .object({
      title: z.string().openapi({
        example: exampleTitle,
      }),
    })
    .openapi('Error');

const createValidationErrorSchema = (exampleTitle = 'ValidationError') =>
  z.object({
    title: z.string().openapi({
      example: exampleTitle,
    }),
    issues: z
      .array(
        z.object({
          code: z.string().optional().openapi({
            example: 'invalid_type',
          }),
          input: z.string().optional().openapi({
            example: 'Invalid',
          }),
          path: z.array(z.union([z.string(), z.number(), z.string()])).openapi({
            example: ['age'],
          }),
          message: z.string().openapi({
            example: 'Expected number, received string',
          }),
        }),
      )
      .openapi('ValidationError'),
  });

export { createErrorSchema, createValidationErrorSchema };
