import { sql } from 'drizzle-orm';

import type { Db } from '../db.js';

const getAllTableNames = async (db: Db): Promise<ReadonlyArray<string>> => {
  const queryResult = await db.execute<{
    tableName: string;
  }>(
    sql`
      SELECT
        table_name "tableName"
      FROM
        information_schema.tables
      WHERE
        table_schema = 'public'
    `,
  );

  return queryResult.rows.map(({ tableName }) => `public.${tableName}`);
};

const truncateTables = async (db: Db) => {
  const tables = await getAllTableNames(db);
  const targetTableString = tables.join(',');
  await db.execute(`TRUNCATE TABLE ${targetTableString} CASCADE`);
};

export { truncateTables };
