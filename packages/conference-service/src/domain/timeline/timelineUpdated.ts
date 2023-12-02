import { DomainEvent } from '../../util/domainEvent';
import type { ConferenceId } from '../conference';
import type { TimelineUpdates } from './timeline';
import { Timeline } from './timeline';

const eventType = 'TimelineUpdated';
export type TimelineUpdated = DomainEvent<typeof eventType, ConferenceId, TimelineUpdates>;

export const TimelineUpdated = {
  build: DomainEvent.buildFn(eventType, Timeline.aggregateType),
} as const;
