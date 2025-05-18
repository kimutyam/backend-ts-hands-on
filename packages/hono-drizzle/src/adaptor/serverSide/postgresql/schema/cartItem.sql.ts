import { integer, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core';

import type { Quantity } from '../../../../domain/cart/quantity.js';
import type { CustomerId } from '../../../../domain/customer/customerId.js';
import type { Price } from '../../../../domain/product/price.js';
import type { ProductId } from '../../../../domain/product/productId.js';
import { timestamps } from './columns.helpers.js';
import { customerTable } from './customer.sql.js';
import { productTable } from './product.sql.js';

const cartItemTable = pgTable(
  'cart_item',
  {
    customerId: varchar('customer_id', { length: 26 })
      .$type<CustomerId>()
      .notNull()
      .references(() => customerTable.customerId, {
        onDelete: 'restrict',
        onUpdate: 'restrict',
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
  (t) => [primaryKey({ columns: [t.customerId, t.productId] })],
);

export { cartItemTable };
