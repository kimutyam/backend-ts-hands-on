import type { Nominal } from '../../nominal';
import type { WithAggregateId } from '../../resolver';

export interface AggregateResolver<
  Id,
  Name extends string,
  Aggregate extends Nominal<Name, WithAggregateId<Id>>,
> {
  resolveById(aggregateId: Id): Promise<Aggregate | undefined>;
}
