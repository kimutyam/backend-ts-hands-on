import { integer, pgTable, unique, varchar } from 'drizzle-orm/pg-core';

import type { Price } from '../../../../domain/product/price.js';
import type { ProductId } from '../../../../domain/product/productId.js';
import { timestamps } from './columns.helpers.js';

const productTable = pgTable(
  'product',
  {
    productId: varchar('product_id', { length: 26 })
      .$type<ProductId>()
      .primaryKey(),
    sequenceNumber: integer('sequence_number').notNull(),
    name: varchar('name', { length: 100 }).notNull(),
    price: integer('price').$type<Price>().notNull(),
    ...timestamps,
  },
  (t) => [unique().on(t.name)],
);

export { productTable };
