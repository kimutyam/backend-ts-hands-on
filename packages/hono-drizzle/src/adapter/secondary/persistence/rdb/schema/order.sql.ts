import { integer, snakeCase, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from '#/adapter/secondary/persistence/rdb/schema/columns.helpers.js';

const orderTable = snakeCase.table('order', {
  orderId: varchar({ length: 26 }).primaryKey(),
  customerId: varchar({ length: 26 }).notNull(),
  sequenceNumber: integer(),
  ...timestamps,
});

export { orderTable };
