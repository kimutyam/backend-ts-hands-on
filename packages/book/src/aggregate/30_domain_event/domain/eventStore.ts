import type { Aggregate } from './aggregate.js';
import type { DomainEvent } from './domainEvent.js';

export interface EventStore<
  KnownAggregate extends Aggregate<any, any>,
  KnownDomainEvent extends DomainEvent<any, any, any>,
> {
  persist: (event: KnownDomainEvent) => Promise<void>;

  persistEventAndSnapshot: (event: KnownDomainEvent, aggregate: KnownAggregate) => Promise<void>;
}
