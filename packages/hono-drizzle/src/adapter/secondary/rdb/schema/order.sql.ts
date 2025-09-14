import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import type { Order } from '../../../../app/domain/order/order.js';
import { timestamps } from './columns.helpers.js';
import { customerTable } from './customer.sql.js';

const orderTable = pgTable('order', {
  orderId: varchar('order_id', { length: 26 })
    .$type<Order['aggregateId']>()
    .primaryKey(),
  customerId: varchar('customer_id', { length: 26 })
    .$type<Order['customerId']>()
    .notNull()
    .references(() => customerTable.customerId, {
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }),
  sequenceNumber: integer('sequence_number'),
  ...timestamps,
});

export { orderTable };
