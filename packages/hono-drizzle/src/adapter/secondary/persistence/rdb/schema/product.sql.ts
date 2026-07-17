import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from '#/adapter/secondary/persistence/rdb/schema/columns.helpers.js';

const productTable = pgTable('product', {
  productId: varchar({ length: 26 }).primaryKey(),
  sequenceNumber: integer().notNull(),
  name: varchar({ length: 100 }).notNull().unique(),
  price: integer().notNull(),
  ...timestamps,
});

export { productTable };
