import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const build = () => {
  const pool = new Pool({ connectionString: process.env['DATABASE_URL']! });
  return drizzle({ client: pool });
};

type Db = ReturnType<typeof build>;

const Db = {
  token: 'db' as const,
  build,
} as const;

export { Db };
