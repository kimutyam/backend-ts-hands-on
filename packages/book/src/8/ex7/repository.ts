import type { ResultAsync } from 'neverthrow';

import type { Aggregate } from '../ex1/aggregate.js';

interface FindById<A extends Aggregate<unknown>, out E> {
  (aggregateId: A['aggregateId']): ResultAsync<A, E>;
}

interface Store<in A extends Aggregate<unknown>> {
  (aggregate: A): ResultAsync<void, never>;
}

interface DeleteById<in A extends Aggregate<unknown>> {
  (aggregateId: A['aggregateId']): ResultAsync<void, never>;
}

export type { DeleteById, FindById, Store };
