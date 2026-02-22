import { z } from 'zod';

const schema = z
  .object({
    DATABASE_URL: z.url().optional().meta({
      example: 'postgresql://user:password@localhost:5432/mydb',
      description: 'データベース接続URL',
    }),
  })
  .readonly()
  .meta({
    description: '環境変数',
  });

type ValidatedEnv = z.infer<typeof schema>;

// 1
/* global NodeJS */
const parse = (value: NodeJS.ProcessEnv): ValidatedEnv => schema.parse(value);

const ValidatedEnv = {
  parse,
} as const;

export { ValidatedEnv };
