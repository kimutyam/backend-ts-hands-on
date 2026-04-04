import type { DomainEventAttribute } from '#/util/domainEvent/domainEventAttribute.js';

export interface DomainEvent<T extends object> {
  eventAttribute: DomainEventAttribute;
  attribute: Readonly<T>;
}
