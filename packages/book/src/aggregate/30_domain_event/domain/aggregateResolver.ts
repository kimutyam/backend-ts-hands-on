import type { Aggregate } from './aggregate';

export interface AggregateResolver<AggregateId, T extends Aggregate<AggregateId>> {
  resolveById(aid: AggregateId): T;
}
