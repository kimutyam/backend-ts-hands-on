import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import { timestamps } from './columns.helpers.js';
import { customerTable } from './customer.sql.js';

const orderTable = pgTable('order', {
  orderId: varchar('order_id', { length: 26 }).primaryKey(),
  customerId: varchar('customer_id', { length: 26 })
    .notNull()
    .references(() => customerTable.customerId, {
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }),
  sequenceNumber: integer('sequence_number'),
  ...timestamps,
});

export { orderTable };
