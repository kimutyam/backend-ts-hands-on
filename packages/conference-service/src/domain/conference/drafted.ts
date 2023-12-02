import { DomainEvent } from '../../util/domainEvent';
import { Conference } from './conference';
import type { ConferenceId } from './conferenceId';

const eventType = 'ConferenceDrafted';
export type Drafted = DomainEvent<typeof eventType, ConferenceId>;
export const Drafted = {
  build: DomainEvent.buildFn<Drafted['eventType']>(eventType, Conference.aggregateType),
} as const;
