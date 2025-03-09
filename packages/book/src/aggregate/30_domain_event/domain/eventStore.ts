import type { Aggregate } from 'aggregate/30_domain_event/domain/aggregate.js';
import type { DomainEvent } from 'aggregate/30_domain_event/domain/domainEvent.js';

export interface EventStore<
  KnownAggregate extends Aggregate<any, any>,
  KnownDomainEvent extends DomainEvent<any, any, any>,
> {
  persist: (event: KnownDomainEvent) => Promise<void>;

  persistEventAndSnapshot: (
    event: KnownDomainEvent,
    aggregate: KnownAggregate,
  ) => Promise<void>;
}
