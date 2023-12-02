import type { WithAggregateId } from './withAggregateId';

export interface AggregateAllResolver<Id, Aggregate extends WithAggregateId<Id>> {
  resolveAll(): Promise<ReadonlyArray<Aggregate>>;
}
