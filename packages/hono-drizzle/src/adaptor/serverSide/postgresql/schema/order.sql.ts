import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import type { CustomerId } from '../../../../domain/customer/customerId.js';
import type { OrderId } from '../../../../domain/order/orderId.js';
import { timestamps } from './columns.helpers.js';
import { customerTable } from './customer.sql.js';

const orderTable = pgTable('order', {
  orderId: varchar('order_id', { length: 26 }).$type<OrderId>().primaryKey(),
  customerId: varchar('customer_id', { length: 26 })
    .$type<CustomerId>()
    .notNull()
    .references(() => customerTable.customerId, {
      onDelete: 'restrict',
      onUpdate: 'restrict',
    }),
  sequenceNumber: integer('sequence_number'),
  ...timestamps,
});

export { orderTable };
