import type { Aggregate } from 'chx/ex30/domain/aggregate.js';
import type { DomainEvent } from 'chx/ex30/domain/domainEvent.js';

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
