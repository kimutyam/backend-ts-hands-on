import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.helpers.js';
import { orderTable } from './order.sql.js';

const orderItemTable = pgTable(
  'order_item',
  {
    orderId: varchar({ length: 26 })
      .notNull()
      .references(() => orderTable.orderId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    productId: varchar({ length: 26 }).notNull(),
    price: integer().notNull(),
    quantity: integer().notNull(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.orderId, t.productId] })],
);

export { orderItemTable };
