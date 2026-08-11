import { z } from 'zod';

const schema = z.url().brand('DatabaseUrl').meta({
  example: 'postgresql://user:password@localhost:5432/mydb',
  description: 'データベース接続URL',
});

type DatabaseUrl = z.output<typeof schema>;

const parse = (value: string): DatabaseUrl => schema.parse(value);

const DatabaseUrl = {
  token: 'DatabaseUrl',
  schema,
  parse,
} as const;

export { DatabaseUrl };
