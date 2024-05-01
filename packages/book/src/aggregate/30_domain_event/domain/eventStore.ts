import type { Aggregate } from './aggregate';
import type { DomainEvent } from './domainEvent';

export interface EventStore<Agg extends Aggregate<any, any>, DE extends DomainEvent<any, any>> {
  persist(event: DE): Promise<void>;

  persistEventAndSnapshot(event: DE, aggregate: Agg): Promise<void>;
}
