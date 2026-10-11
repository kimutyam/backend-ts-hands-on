import { z } from 'zod';

const schema = z
  .url({
    protocol: /^postgres(?:ql)?$/,
    error: 'PostgreSQL接続URLを指定してください',
  })
  .brand('DatabaseUrl')
  .meta({
    example: 'postgresql://user:password@localhost:5432/mydb',
    description: 'PostgreSQL接続URL',
  });

type DatabaseUrl = z.output<typeof schema>;

const parse = (value: string): DatabaseUrl => schema.parse(value);

const DatabaseUrl = {
  token: 'DatabaseUrl',
  schema,
  parse,
} as const;

export { DatabaseUrl };
