import { z } from 'zod';

const schema = z
  .object({
    DATABASE_URL: z.url().optional(),
  })
  .readonly();

type ValidatedEnv = z.infer<typeof schema>;

/* global NodeJS */
const parse = (value: NodeJS.ProcessEnv): ValidatedEnv => schema.parse(value);

const ValidatedEnv = {
  parse,
} as const;

export { ValidatedEnv };
