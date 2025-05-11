import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const build = () => {
  const url = process.env['DATABASE_URL'];
  if (url === undefined) {
    throw new Error('DATABASE_URL is not defined');
  }
  const pool = new Pool({ connectionString: url });
  return drizzle({ client: pool, casing: 'snake_case' });
};

type Db = ReturnType<typeof build>;

const Db = {
  token: 'db' as const,
  build,
} as const;

export { Db };
