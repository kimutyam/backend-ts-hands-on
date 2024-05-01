import type { Aggregate } from './aggregate';

export interface AggregateResolver<AggregateId, T extends Aggregate<AggregateId, any>> {
  resolveById(aid: AggregateId): T;
}
