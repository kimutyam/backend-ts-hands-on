import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.helpers.js';

const cartTable = pgTable('cart', {
  customerId: varchar({ length: 26 }).primaryKey(),
  sequenceNumber: integer().notNull(),
  ...timestamps,
});

export { cartTable };
