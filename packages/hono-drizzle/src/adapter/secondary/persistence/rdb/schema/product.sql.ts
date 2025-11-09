import { integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core';

import type { Product } from '../../../../../app/domain/product/product.js';
import { timestamps } from './columns.helpers.js';

const productTable = pgTable(
  'product',
  {
    productId: varchar({ length: 26 }).primaryKey(),
    sequenceNumber: integer().notNull(),
    name: varchar({ length: 100 }).notNull(),
    price: integer().$type<Product['price']>().notNull(),
    ...timestamps,
  },
  (t) => [unique().on(t.name)],
);

export { productTable };
