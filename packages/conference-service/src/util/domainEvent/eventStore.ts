import type { DomainEvent } from './domainEvent';

export interface EventStore<N extends DomainEvent<any, any, any>> {
  store(event: N): Promise<void>;
}
