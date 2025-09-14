import {
  integer,
  jsonb,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import type { DomainEventId } from '../../../../domain/domainEventId.js';

const domainEventTable = pgTable('domain_event', {
  eventId: varchar('event_id', { length: 26 })
    .$type<DomainEventId>()
    .primaryKey(),
  occurredAt: timestamp('occurred_at', { withTimezone: true }).notNull(),
  sequenceNumber: integer('sequence_number').notNull(),
  eventName: varchar('event_name', { length: 50 }).notNull(),
  aggregateId: varchar('aggregate_id', { length: 26 }).notNull(),
  aggregateName: varchar('aggregate_name', { length: 50 }).notNull(),
  payload: jsonb('payload').$type<{ [k: string]: unknown }>().notNull(),
});

export { domainEventTable };
