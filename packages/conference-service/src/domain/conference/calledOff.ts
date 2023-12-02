import { DomainEvent } from '../../util/domainEvent';
import { Conference } from './conference';
import type { ConferenceId } from './conferenceId';

const eventType = 'ConferenceCalledOff';
export type CalledOff = DomainEvent<
  typeof eventType,
  ConferenceId,
  Readonly<{
    reason: string;
  }>
>;

export const CalledOff = {
  build: DomainEvent.buildFn(eventType, Conference.aggregateType),
} as const;
