import type { Aggregate } from 'aggregate/30_domain_event/domain/aggregate.js';
import type { AggregateNotFoundError } from 'aggregate/30_domain_event/domain/aggregateNotFoundError.js';
import type { ResultAsync } from 'neverthrow';

export interface AggregateResolver<
  AggregateId,
  T extends Aggregate<AggregateId, any>,
  E extends AggregateNotFoundError,
> {
  resolveById: (id: AggregateId) => ResultAsync<T, E>;
}
