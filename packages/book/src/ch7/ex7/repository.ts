import type { Aggregate } from 'ch7/ex1/aggregate.js';
import type { ResultAsync } from 'neverthrow';

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
