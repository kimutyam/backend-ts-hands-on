import type { ResultAsync } from 'neverthrow';

import type { Aggregate } from './aggregate.js';
import type { ApplicationError } from './applicationError.js';
import type { DomainEvent } from './domainEvent.js';

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
