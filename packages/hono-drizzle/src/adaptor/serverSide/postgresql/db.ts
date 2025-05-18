import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import type { Pool } from 'pg';

import { PgPool } from './pgPool.js';

const build = (pool: Pool) => drizzle({ client: pool, casing: 'snake_case' });

type Db = ReturnType<typeof build>;

build.inject = [PgPool.token] as const;

const Db = {
  token: 'db' as const,
  build,
} as const;

export { Db };
