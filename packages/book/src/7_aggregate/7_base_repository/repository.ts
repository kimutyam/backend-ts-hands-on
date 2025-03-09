import type { Aggregate } from '7_aggregate/1/aggregate.js';
import type { ResultAsync } from 'neverthrow';

interface FindById<
  A extends Aggregate<any>,
  out E extends Error,
> {
  (aggregateId: A['aggregateId']): ResultAsync<A, E>;
}

interface Save<in A extends Aggregate<any>> {
  (aggregate: A): Promise<void>;
}

interface DeleteById<in A extends Aggregate<any>> {
  (aggregateId: A['aggregateId']): Promise<void>;
}

export type { FindById, Save, DeleteById };
