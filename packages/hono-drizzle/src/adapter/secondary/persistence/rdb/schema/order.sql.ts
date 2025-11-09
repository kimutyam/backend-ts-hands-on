import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.helpers.js';

const orderTable = pgTable('order', {
  orderId: varchar({ length: 26 }).primaryKey(),
  customerId: varchar({ length: 26 }).notNull(),
  sequenceNumber: integer(),
  ...timestamps,
});

export { orderTable };
