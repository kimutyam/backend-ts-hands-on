import type { Aggregate } from 'ch8/ex1/aggregate.js';
import { DomainEventId } from 'ch8/ex1/domainEventId.js';

interface DomainEvent<
  AggregateId,
  AggregateName extends string,
  EventName extends string,
  Payload extends { [k: string]: unknown },
> {
  readonly eventId: DomainEventId;
  readonly occurredAt: Date;
  readonly sequenceNumber: number;
  readonly eventName: EventName;
  readonly aggregateId: AggregateId;
  readonly aggregateName: AggregateName;
  readonly payload: Payload;
}

const generate =
  <
    AggregateName extends string,
    EventName extends string,
    Payload extends { [k: string]: unknown },
  >(
    aggregateName: AggregateName,
    eventName: EventName,
    payload: Payload,
    generateEventId: () => DomainEventId = DomainEventId.generate,
  ) =>
  <A extends Aggregate<any>>({
    aggregateId,
    sequenceNumber,
  }: A): DomainEvent<A['aggregateId'], AggregateName, EventName, Payload> => {
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
