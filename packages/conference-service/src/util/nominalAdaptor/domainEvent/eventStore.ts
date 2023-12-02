import type { AnyNominalDomainEvent } from './builder';

export interface EventStore<N extends AnyNominalDomainEvent> {
  store(event: N): Promise<void>;
}
