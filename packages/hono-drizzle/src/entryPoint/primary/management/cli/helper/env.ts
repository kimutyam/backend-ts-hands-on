import { z } from 'zod';

const schema = z
  .object({
    DATABASE_URL: z.string().url().optional(),
  })
  .readonly();

type AppEnv = z.infer<typeof schema>;

const parse = (value: NodeJS.ProcessEnv): AppEnv => schema.parse(value);

const onMemoryDB = (appEnv: AppEnv): boolean =>
  appEnv.DATABASE_URL === undefined;

const AppEnv = {
  parse,
  onMemoryDB,
} as const;

export { AppEnv };
