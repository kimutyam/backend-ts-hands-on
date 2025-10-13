import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';

import { DatabaseUrl } from './databaseUrl.js';

const create = (url: DatabaseUrl) => {
  const db = drizzle({
    connection: url,
    casing: 'snake_case',
    logger: true,
  });
  const dispose = async () => {
    await db.$client.end();
    console.log('Pool Ended');
  };
  return Object.assign(db, { dispose });
};

type Db = ReturnType<typeof create>;

create.inject = [DatabaseUrl.token] as const;

const Db = {
  token: 'db' as const,
  create,
} as const;

export { Db };
