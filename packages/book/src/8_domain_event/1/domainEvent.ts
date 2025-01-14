import type { Aggregate } from './aggregate';
import { DomainEventId } from './domainEventId';

interface DomainEvent<
  AggregateId,
  EventName extends string,
  Payload extends { [k: string]: unknown } | undefined,
> {
  readonly eventId: DomainEventId;
  readonly occurredAt: Date;
  readonly sequenceNumber: number;
  readonly eventName: EventName;
  readonly aggregateId: AggregateId;
  readonly aggregateName: string;
  readonly payload: Payload;
}

const generate =
  <EventName extends string, Payload extends { [k: string]: unknown } | undefined>(
    eventName: EventName,
    payload: Payload,
    generateEventId: () => DomainEventId = DomainEventId.generate,
  ) =>
  <A extends Aggregate<any, any>>({
    aggregateId,
    aggregateName,
    sequenceNumber,
  }: A): DomainEvent<A['aggregateId'], EventName, Payload> => {
    const eventId = generateEventId();
    return {
      eventId,
      occurredAt: new Date(DomainEventId.getTimestamp(eventId)),
      sequenceNumber,
      eventName,
      aggregateId,
      aggregateName,
      payload,
    };
  };

const DomainEvent = {
  generate,
} as const;

export { DomainEvent };
