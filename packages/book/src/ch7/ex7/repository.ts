import type { ResultAsync } from 'neverthrow';

import type { Aggregate } from '../ex1/aggregate.js';

interface FindById<A extends Aggregate<unknown>, out E> {
  (aggregateId: A['aggregateId']): ResultAsync<A, E>;
}

interface Store<in A extends Aggregate<unknown>> {
  (aggregate: A): Promise<void>;
}

interface DeleteById<in A extends Aggregate<unknown>> {
  (aggregateId: A['aggregateId']): Promise<void>;
}

export type { DeleteById, FindById, Store };
