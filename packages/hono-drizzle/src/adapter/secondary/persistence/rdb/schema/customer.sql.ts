import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.helpers.js';

const customerTable = pgTable('customer', {
  customerId: varchar({ length: 26 }).primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  ...timestamps,
});

export { customerTable };
