import type { Aggregate } from '9_always_valid_domain_model/50/aggregate.js';
import type { ResultAsync } from 'neverthrow';

interface FindById<
  A extends Aggregate<any>,
  out E extends Error,
> {
  (aggregateId: A['aggregateId']): ResultAsync<A, E>;
}

export type { FindById };
