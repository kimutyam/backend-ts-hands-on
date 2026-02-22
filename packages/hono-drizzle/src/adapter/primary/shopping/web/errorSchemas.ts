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
          example: ['age'],
        }),
        message: z.string().meta({
          example: 'Expected number, received string',
        }),
      }),
    ),
  })
  .meta({ id: 'ValidationError' });

export { ErrorSchema, ValidationErrorSchema };
