import type { ResultAsync } from 'neverthrow';

import type { Aggregate } from './aggregate.js';

interface FindById<A extends Aggregate<any>, out E extends Error> {
  (aggregateId: A['aggregateId']): ResultAsync<A, E>;
}

export type { FindById };
