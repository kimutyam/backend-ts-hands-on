import type { ResultAsync } from 'neverthrow';
import type { Aggregate } from './aggregate.js';
import type { AggregateNotFoundError } from './aggregateNotFoundError.js';

export interface AggregateResolver<
  AggregateId,
  T extends Aggregate<AggregateId, any>,
  E extends AggregateNotFoundError,
> {
  resolveById(id: AggregateId): ResultAsync<T, E>;
}
