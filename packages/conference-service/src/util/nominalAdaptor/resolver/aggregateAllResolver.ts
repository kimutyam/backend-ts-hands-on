import type { Nominal } from '../../nominal';
import type { WithAggregateId } from '../../resolver';

export interface AggregateAllResolver<
  Id,
  Name extends string,
  Aggregate extends Nominal<Name, WithAggregateId<Id>>,
> {
  resolveAll(): Promise<ReadonlyArray<Aggregate>>;
}
