import type { ResultAsync } from 'neverthrow';

import type { Aggregate } from '#/app/domain/aggregate.js';
import type { DomainEvent } from '#/app/domain/domainEvent.js';
import type { ApplicationError } from '#/app/util/applicationError.js';

interface StoreEvent<
  in A extends Aggregate<unknown>,
  in DE extends DomainEvent<
    A['aggregateId'],
    string,
    string,
    Record<string, unknown>
  >,
  out E extends ApplicationError<string> = never,
> {
  (event: DE, aggregate: A): ResultAsync<void, E>;
}

export type { StoreEvent };
