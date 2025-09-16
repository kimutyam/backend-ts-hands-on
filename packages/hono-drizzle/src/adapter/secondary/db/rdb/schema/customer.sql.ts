import { pgTable, varchar } from 'drizzle-orm/pg-core';

import type { CustomerId } from '../../../../../app/domain/customer/customerId.js';
import { timestamps } from './columns.helpers.js';

const customerTable = pgTable('customer', {
  customerId: varchar('customer_id', { length: 26 })
    .$type<CustomerId>()
    .primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  ...timestamps,
});

export { customerTable };
