import { z } from 'zod';

const schema = z
  .object({
    DATABASE_URL: z.string().url().optional(),
  })
  .readonly();

type AppEnv = z.infer<typeof schema>;

const parse = (value: NodeJS.ProcessEnv): AppEnv => schema.parse(value);

const AppEnv = {
  parse,
} as const;

export { AppEnv };
