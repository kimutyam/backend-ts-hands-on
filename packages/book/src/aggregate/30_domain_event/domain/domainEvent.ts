import { ulid } from 'ulidx';
import type { Aggregate } from './aggregate';

export interface DomainEvent<AggregateId, EventName extends string> {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly sequenceNumber: number;
  readonly eventName: EventName;
  readonly aggregateId: AggregateId;
  readonly aggregateName: string;
}

const build =
  <EventName extends string, Payload extends object>(
    eventName: EventName,
    aggregateName: string,
    payload: Payload,
    generateEventId: () => string = () => ulid(),
    generateDate: () => Date = () => new Date(),
  ) =>
  <A extends Aggregate<any>>(aggregate: A): DomainEvent<A['aggregateId'], EventName> & Payload => ({
    eventId: generateEventId(),
    occurredAt: generateDate(),
    sequenceNumber: aggregate.sequenceNumber,
    eventName,
    aggregateId: aggregate.aggregateId,
    aggregateName,
    ...payload,
  });

export const DomainEvent = {
  build,
} as const;
