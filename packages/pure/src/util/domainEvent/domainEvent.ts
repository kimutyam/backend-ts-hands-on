import type { DomainEventAttribute } from './domainEventAttribute';

export interface DomainEvent<T extends object> {
  eventAttribute: DomainEventAttribute;
  attribute: Readonly<T>;
}
