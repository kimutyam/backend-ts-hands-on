import { Db } from '#/adapter/secondary/persistence/rdb/db.js';

const getDbInstanceFromEnv = (): Db => {
  const url = process.env['DATABASE_URL'];
  if (url === undefined) {
    throw new Error('DATABASE_URL is not defined');
  }
  return Db.getInstance(url);
};

export { getDbInstanceFromEnv };
