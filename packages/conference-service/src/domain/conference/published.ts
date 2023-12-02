import { DomainEvent } from '../../util/domainEvent';
import { Conference } from './conference';
import type { ConferenceId } from './conferenceId';

const eventType = 'ConferencePublished';
export type Published = DomainEvent<typeof eventType, ConferenceId>;

export const Published = {
  build: DomainEvent.buildFn(eventType, Conference.aggregateType),
} as const;
