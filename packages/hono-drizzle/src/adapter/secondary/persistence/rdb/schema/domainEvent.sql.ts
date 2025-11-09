import {
  integer,
  jsonb,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

const domainEventTable = pgTable('domain_event', {
  eventId: varchar({ length: 26 }).primaryKey(),
  occurredAt: timestamp({ withTimezone: true }).notNull(),
  sequenceNumber: integer().notNull(),
  eventName: varchar({ length: 50 }).notNull(),
  aggregateId: varchar({ length: 26 }).notNull(),
  aggregateName: varchar({ length: 50 }).notNull(),
  payload: jsonb().$type<Record<string, unknown>>().notNull(),
});

export { domainEventTable };
