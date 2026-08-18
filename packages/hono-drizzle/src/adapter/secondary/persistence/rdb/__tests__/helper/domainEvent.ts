import { sql } from 'drizzle-orm';

import type { Db } from '#/adapter/secondary/persistence/rdb/db.js';
import type { DomainEvent } from '#/app/domain/domainEvent.js';
import type { DomainEventId } from '#/app/domain/domainEventId.js';

type Row<T extends DomainEvent<any, any, any, any>> = Pick<
  T,
  'sequenceNumber' | 'payload'
>;

const createSelectDomainEventFn =
  (db: Db) =>
  <T extends DomainEvent<any, any, any, any>>(
    eventId: DomainEventId,
  ): ReturnType<typeof db.execute<Row<T>>> =>
    db.execute<Row<T>>(
      sql`
        SELECT
          sequence_number "sequenceNumber",
          payload
        FROM
          domain_event
        WHERE
          event_id = ${eventId}`,
    );

export { createSelectDomainEventFn };
