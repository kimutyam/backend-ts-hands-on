import type { WithAggregateId } from './withAggregateId';

export interface AggregateResolver<Id, Aggregate extends WithAggregateId<Id>> {
  resolveById(aggregateId: Id): Promise<Aggregate | undefined>;
}
