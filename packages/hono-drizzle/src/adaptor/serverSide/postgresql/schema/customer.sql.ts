import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.helpers.js';

const customerTable = pgTable('customer', {
  customerId: varchar('customer_id', { length: 26 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  ...timestamps,
});

export { customerTable };
