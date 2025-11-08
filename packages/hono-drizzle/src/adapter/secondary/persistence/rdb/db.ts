import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import type { Disposable } from 'typed-inject';

import { DatabaseUrl } from './databaseUrl.js';

const createNodePgDatabase = (url: DatabaseUrl) => {
  const pool = new Pool({
    connectionString: url,
    max: 30,
    min: 3,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000,
  });

  return drizzle({
    client: pool,
    casing: 'snake_case',
    logger: true,
  });
};

type Db = ReturnType<typeof createNodePgDatabase> & Disposable;

const create = (url: DatabaseUrl): Db => {
  const nodePgDatabase = createNodePgDatabase(url);
  const dispose = async () => {
    await nodePgDatabase.$client.end();
    console.log('Pool Ended');
  };
  return Object.assign(nodePgDatabase, { dispose });
};

create.inject = [DatabaseUrl.token] as const;

const Db = {
  token: 'Db' as const,
  create,
} as const;

export { Db };
