import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.helpers.js';
import { orderTable } from './order.sql.js';
import { productTable } from './product.sql.js';

const orderItemTable = pgTable(
  'order_item',
  {
    orderId: varchar('order_id', { length: 26 })
      .notNull()
      .references(() => orderTable.orderId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    productId: varchar('product_id', { length: 26 })
      .notNull()
      .references(() => productTable.productId, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),
    price: integer('price').notNull(),
    quantity: integer('quantity').notNull(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.orderId, t.productId] })],
);

export { orderItemTable };
