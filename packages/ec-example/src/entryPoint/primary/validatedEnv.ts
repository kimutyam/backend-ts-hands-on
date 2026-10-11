import { z } from 'zod';

import { DatabaseUrl } from '#/adapter/secondary/persistence/rdb/databaseUrl.js';

const schema = z
  .object({
    DATABASE_URL: DatabaseUrl.schema.optional(),
  })
  .readonly()
  .meta({
    description: '環境変数',
  });

type ValidatedEnv = z.output<typeof schema>;

// Node.js の process.env を受け取って Zod スキーマでバリデーションしている
/* global NodeJS */
const parse = (value: NodeJS.ProcessEnv): ValidatedEnv => schema.parse(value);

const ValidatedEnv = {
  parse,
} as const;

export { ValidatedEnv };
