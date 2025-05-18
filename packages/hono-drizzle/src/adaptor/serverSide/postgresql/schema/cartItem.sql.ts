import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';

import type { Cart } from '../../../../domain/cart/cart.js';
import type { CartItem } from '../../../../domain/cart/cartItem.js';
import { timestamps } from './columns.helpers.js';
import { customerTable } from './customer.sql.js';
import { productTable } from './product.sql.js';

const cartItemTable = pgTable(
  'cart_item',
  {
    customerId: varchar('customer_id', { length: 26 })
      .$type<Cart['aggregateId']>()
      .notNull()
      .references(() => customerTable.customerId, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),
    productId: varchar('product_id', { length: 26 })
      .$type<CartItem['productId']>()
      .notNull()
      .references(() => productTable.productId, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),
    price: integer('price').$type<CartItem['price']>().notNull(),
    quantity: integer('quantity').$type<CartItem['quantity']>().notNull(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.customerId, t.productId] })],
);

export { cartItemTable };
