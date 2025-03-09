import type { Aggregate } from '8_domain_event/1/aggregate.js';
import type { ResultAsync } from 'neverthrow';

interface FindById<
  A extends Aggregate<any>,
  out E extends Error,
> {
  (aggregateId: A['aggregateId']): ResultAsync<A, E>;
}

export type { FindById };
