import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import type { Cart } from '../../../../../app/domain/cart/cart.js';
import { timestamps } from './columns.helpers.js';

const cartTable = pgTable('cart', {
  customerId: varchar('customer_id', { length: 26 })
    .$type<Cart['aggregateId']>()
    .primaryKey(),
  sequenceNumber: integer('sequence_number').notNull(),
  ...timestamps,
});

export { cartTable };
