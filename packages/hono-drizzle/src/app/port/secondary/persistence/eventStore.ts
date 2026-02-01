import type { ResultAsync } from 'neverthrow';

import type { Aggregate } from '../../../domain/aggregate.js';
import type { DomainEvent } from '../../../domain/domainEvent.js';
import type { ApplicationError } from '../../../util/applicationError.js';

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
