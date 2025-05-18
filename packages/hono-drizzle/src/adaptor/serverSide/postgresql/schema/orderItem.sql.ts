import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';

import type { Quantity } from '../../../../domain/cart/quantity.js';
import type { OrderId } from '../../../../domain/order/orderId.js';
import type { Price } from '../../../../domain/product/price.js';
import type { ProductId } from '../../../../domain/product/productId.js';
import { timestamps } from './columns.helpers.js';
import { orderTable } from './order.sql.js';
import { productTable } from './product.sql.js';

const orderItemTable = pgTable(
  'order_item',
  {
    orderId: varchar('order_id', { length: 26 })
      .$type<OrderId>()
      .notNull()
      .references(() => orderTable.orderId, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    productId: varchar('product_id', { length: 26 })
      .$type<ProductId>()
      .notNull()
      .references(() => productTable.productId, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),
    price: integer('price').$type<Price>().notNull(),
    quantity: integer('quantity').$type<Quantity>().notNull(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.orderId, t.productId] })],
);

export { orderItemTable };
