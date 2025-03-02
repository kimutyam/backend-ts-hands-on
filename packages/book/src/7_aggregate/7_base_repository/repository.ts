import type { ResultAsync } from 'neverthrow';
import type { Aggregate } from '../1/aggregate.js';

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
