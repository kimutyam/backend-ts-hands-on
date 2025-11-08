import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import type { Order } from '../../../../../app/domain/order/order.js';
import { timestamps } from './columns.helpers.js';

const orderTable = pgTable('order', {
  orderId: varchar({ length: 26 }).$type<Order['aggregateId']>().primaryKey(),
  customerId: varchar({ length: 26 }).$type<Order['customerId']>().notNull(),
  sequenceNumber: integer(),
  ...timestamps,
});

export { orderTable };
