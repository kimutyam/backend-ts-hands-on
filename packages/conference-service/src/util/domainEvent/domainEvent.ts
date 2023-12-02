import type { WithAggregateId } from '../resolver';
import { DomainEventId } from './domainEventId';

export type DomainEvent<
  EventType extends string,
  AggregateId,
  T extends object | undefined = undefined,
> = {
  eventId: DomainEventId;
  eventType: EventType;
  aggregateType: string;
  timestamp: number;
  attribute?: T;
} & WithAggregateId<AggregateId>;

const buildFn =
  <EventType extends string>(eventType: EventType, aggregateType: string) =>
  <AggregateId, T extends object | undefined = undefined>(
    aggregateId: AggregateId,
    attribute: T | undefined = undefined,
    generateEventId: typeof DomainEventId.generate = DomainEventId.generate,
  ): DomainEvent<EventType, AggregateId, T> => {
    const eventId = generateEventId();
    const timestamp = DomainEventId.getTimestamp(eventId);
    return attribute
      ? {
          eventId,
          eventType,
          timestamp,
          aggregateId,
          aggregateType,
          attribute,
        }
      : { eventId, eventType, timestamp, aggregateId, aggregateType };
  };

export const DomainEvent = {
  buildFn,
} as const;
