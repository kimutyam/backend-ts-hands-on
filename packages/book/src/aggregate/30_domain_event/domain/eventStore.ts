import type { Aggregate } from './aggregate';
import type { DomainEvent } from './domainEvent';

export interface EventStore<A extends Aggregate<any, any>, E extends DomainEvent<any, any, any>> {
  persist(event: E): Promise<void>;

  persistEventAndSnapshot(event: E, aggregate: A): Promise<void>;
}
