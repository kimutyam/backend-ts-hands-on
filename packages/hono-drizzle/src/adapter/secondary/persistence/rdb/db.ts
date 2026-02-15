import type { Logger } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import type { Disposable } from 'typed-inject';

import { getRequestContext } from '../../../../app/util/requestContext.js';
import { DatabaseUrl } from './databaseUrl.js';

const queryLogger: Logger = {
  logQuery: (query: string, params?: Array<unknown>) => {
    const context = getRequestContext();
    if (context === undefined) {
      console.info(query, params);
    } else {
      const { requestId, primaryPort } = context;
      console.info(requestId, primaryPort, query, params);
    }
  },
};

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
    logger: queryLogger,
  });
};

type Db = ReturnType<typeof createNodePgDatabase> & Disposable;

const getInstance = (url: DatabaseUrl): Db => {
  const nodePgDatabase = createNodePgDatabase(url);
  const dispose = async () => {
    await nodePgDatabase.$client.end();
    console.log('Pool Ended');
  };
  return Object.assign(nodePgDatabase, { dispose });
};

getInstance.inject = [DatabaseUrl.token] as const;

const Db = {
  token: 'Db' as const,
  getInstance,
} as const;

export { Db };
