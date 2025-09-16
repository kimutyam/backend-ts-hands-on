import 'dotenv/config';

import { Pool } from 'pg';
import type { Disposable } from 'typed-inject';

type PgPool = Pool & Disposable;

const build = (): PgPool => {
  const url = process.env['DATABASE_URL'];
  if (url === undefined) {
    throw new Error('DATABASE_URL is not defined');
  }
  const pool = new Pool({ connectionString: url });
  const dispose = async () => {
    console.log('Pool dispose');
    await pool.end();
  };
  return Object.assign(pool, { dispose });
};

const PgPool = {
  token: 'PgPool' as const,
  build,
} as const;

export { PgPool };
