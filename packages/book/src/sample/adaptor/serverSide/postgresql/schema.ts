import { pgTable, varchar } from 'drizzle-orm/pg-core';

const usersTable = pgTable('users', {
  id: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});

export { usersTable };
