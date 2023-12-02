import { DomainEventId } from './domainEventId';

export type DomainEventAttribute = Readonly<{
  eventId: DomainEventId;
  eventAt: Date;
}>;

export const DomainEventAttribute = {
  generate: (eventAt?: Date): DomainEventAttribute => ({
    eventId: DomainEventId.generate(),
    eventAt: eventAt || new Date(),
  }),
} as const;
