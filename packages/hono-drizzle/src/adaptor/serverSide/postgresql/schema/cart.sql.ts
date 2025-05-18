import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import type { CustomerId } from '../../../../domain/customer/customerId.js';
import { timestamps } from './columns.helpers.js';
import { customerTable } from './customer.sql.js';

const cartTable = pgTable('cart', {
  customerId: varchar('customer_id', { length: 26 })
    .$type<CustomerId>()
    .primaryKey()
    .references(() => customerTable.customerId, {
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }),
  sequenceNumber: integer('sequence_number').notNull(),
  ...timestamps,
});

export { cartTable };
