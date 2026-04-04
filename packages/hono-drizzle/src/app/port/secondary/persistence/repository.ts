import type { ResultAsync } from 'neverthrow';

import type { Aggregate } from '#/app/domain/aggregate.js';

interface FindById<A extends Aggregate<any>, out E> {
  (aggregateId: A['aggregateId']): ResultAsync<A, E>;
}

export type { FindById };
