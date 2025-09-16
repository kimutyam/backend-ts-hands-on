import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.helpers.js';

const userAccountTable = pgTable('user_account', {
  id: varchar('id', { length: 26 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  ...timestamps,
});

export { userAccountTable };
