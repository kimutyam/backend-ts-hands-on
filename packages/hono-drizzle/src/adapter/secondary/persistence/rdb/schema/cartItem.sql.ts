import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';

import { cartTable } from './cart.sql.js';
import { timestamps } from './columns.helpers.js';

const cartItemTable = pgTable(
  'cart_item',
  {
    customerId: varchar({ length: 26 })
      .notNull()
      .references(() => cartTable.customerId, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),
    productId: varchar({ length: 26 }).notNull(),
    price: integer().notNull(),
    quantity: integer().notNull(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.customerId, t.productId] })],
);

export { cartItemTable };
