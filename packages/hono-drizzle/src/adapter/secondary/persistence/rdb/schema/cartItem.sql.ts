import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';

import type { Cart } from '../../../../../app/domain/cart/cart.js';
import type { CartItem } from '../../../../../app/domain/cart/cartItem.js';
import { cartTable } from './cart.sql.js';
import { timestamps } from './columns.helpers.js';

const cartItemTable = pgTable(
  'cart_item',
  {
    customerId: varchar({ length: 26 })
      .$type<Cart['aggregateId']>()
      .notNull()
      .references(() => cartTable.customerId, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),
    productId: varchar({ length: 26 }).$type<CartItem['productId']>().notNull(),
    price: integer().$type<CartItem['price']>().notNull(),
    quantity: integer().$type<CartItem['quantity']>().notNull(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.customerId, t.productId] })],
);

export { cartItemTable };
