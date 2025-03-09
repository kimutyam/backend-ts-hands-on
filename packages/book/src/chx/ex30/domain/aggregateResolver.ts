import type { Aggregate } from 'chx/ex30/domain/aggregate.js';
import type { AggregateNotFoundError } from 'chx/ex30/domain/aggregateNotFoundError.js';
import type { ResultAsync } from 'neverthrow';

export interface AggregateResolver<
  AggregateId,
  T extends Aggregate<AggregateId, any>,
  E extends AggregateNotFoundError,
> {
  resolveById: (id: AggregateId) => ResultAsync<T, E>;
}
