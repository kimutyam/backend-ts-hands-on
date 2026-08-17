import { sql } from 'drizzle-orm';
import type { PgAsyncRaw } from 'drizzle-orm/pg-core/async/raw';
import type { QueryResult } from 'pg';

import type { Db } from '#/adapter/secondary/persistence/rdb/db.js';
import type { DomainEvent } from '#/app/domain/domainEvent.js';
import type { DomainEventId } from '#/app/domain/domainEventId.js';

const createSelectDomainEventFn =
  (db: Db) =>
  <T extends DomainEvent<any, any, any, any>>(
    eventId: DomainEventId,
  ): PgAsyncRaw<QueryResult<Pick<T, 'sequenceNumber' | 'payload'>>> =>
    db.execute<Pick<T, 'sequenceNumber' | 'payload'>>(
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
