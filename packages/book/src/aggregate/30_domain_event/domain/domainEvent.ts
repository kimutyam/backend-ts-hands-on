import type { Aggregate } from './aggregate';
import { DomainEventId } from './domainEventId';

export interface DomainEvent<
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
  readonly payload?: Payload;
}

const generate =
  <EventName extends string, Payload extends { [k: string]: unknown } | undefined>(
    eventName: EventName,
    aggregateName: string,
    payload: Payload,
    generateEventId: () => DomainEventId = DomainEventId.generate,
  ) =>
  <A extends Aggregate<any, any>>(
    aggregate: A,
  ): DomainEvent<A['aggregateId'], EventName, Payload> => {
    const eventId = generateEventId();
    return {
      eventId,
      occurredAt: new Date(DomainEventId.getTimestamp(eventId)),
      sequenceNumber: aggregate.sequenceNumber,
      eventName,
      aggregateId: aggregate.aggregateId,
      aggregateName,
      payload,
    };
  };

export const DomainEvent = {
  generate,
} as const;
