import { integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core';

import type { Product } from '../../../../../app/domain/product/product.js';
import { timestamps } from './columns.helpers.js';

const productTable = pgTable(
  'product',
  {
    productId: varchar('product_id', { length: 26 })
      .$type<Product['aggregateId']>()
      .primaryKey(),
    sequenceNumber: integer('sequence_number').notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    price: integer('price').$type<Product['price']>().notNull(),
    ...timestamps,
  },
  (t) => [unique().on(t.name)],
);

export { productTable };
