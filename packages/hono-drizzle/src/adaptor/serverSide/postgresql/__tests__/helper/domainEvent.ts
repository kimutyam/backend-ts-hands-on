import { sql } from 'drizzle-orm';
import type { PgRaw } from 'drizzle-orm/pg-core/query-builders/raw';
import type { QueryResult } from 'pg';

import type { DomainEvent } from '../../../../../domain/domainEvent.js';
import type { DomainEventId } from '../../../../../domain/domainEventId.js';
import type { Db } from '../../db.js';

const buildSelectDomainEvent =
  (db: Db) =>
  <T extends DomainEvent<any, any, any, any>>(
    eventId: DomainEventId,
  ): PgRaw<QueryResult<Pick<T, 'sequenceNumber' | 'payload'>>> =>
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

export { buildSelectDomainEvent };
