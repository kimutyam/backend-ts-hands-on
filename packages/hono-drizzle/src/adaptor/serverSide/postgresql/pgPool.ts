import 'dotenv/config';

import { Pool } from 'pg';

const build = () => {
  const url = process.env['DATABASE_URL'];
  if (url === undefined) {
    throw new Error('DATABASE_URL is not defined');
  }
  return new Pool({ connectionString: url });
};

const PgPool = {
  token: 'PgPool' as const,
  build,
} as const;

export { PgPool };
