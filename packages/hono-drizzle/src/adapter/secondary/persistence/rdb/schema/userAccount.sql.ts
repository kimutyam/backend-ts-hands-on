import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

import type { UserAccount } from '../../../../../app/domain/userAccount/userAccount.js';
import { timestamps } from './columns.helpers.js';

const userAccountTable = pgTable('user_account', {
  id: varchar({ length: 26 }).$type<UserAccount['aggregateId']>().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  sequenceNumber: integer().notNull(),
  ...timestamps,
});

export { userAccountTable };
