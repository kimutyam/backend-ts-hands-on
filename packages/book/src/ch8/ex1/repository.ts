import type { Aggregate } from 'ch8/ex1/aggregate.js';
import type { ResultAsync } from 'neverthrow';

interface FindById<
  A extends Aggregate<any>,
  out E extends Error,
> {
  (aggregateId: A['aggregateId']): ResultAsync<A, E>;
}

export type { FindById };
