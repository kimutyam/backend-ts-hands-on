import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';

import type { Quantity } from '../../../../app/domain/cart/quantity.js';
import type { Order } from '../../../../app/domain/order/order.js';
import type { Price } from '../../../../app/domain/product/price.js';
import type { ProductId } from '../../../../app/domain/product/productId.js';
import { timestamps } from './columns.helpers.js';
import { orderTable } from './order.sql.js';
import { productTable } from './product.sql.js';

const orderItemTable = pgTable(
  'order_item',
  {
    orderId: varchar('order_id', { length: 26 })
      .$type<Order['aggregateId']>()
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
