import { integer, snakeCase, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from '#/adapter/secondary/persistence/rdb/schema/columns.helpers.js';

const cartTable = snakeCase.table('cart', {
  customerId: varchar({ length: 26 }).primaryKey(),
  sequenceNumber: integer().notNull(),
  ...timestamps,
});

export { cartTable };
