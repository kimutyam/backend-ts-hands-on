import { DomainEvent } from '../../util/domainEvent';
import type { ConferenceId } from '../conference';
import { Timeline } from './timeline';

const name = 'TimelineCreated';
export type TimelineCreated = DomainEvent<typeof name, ConferenceId, Timeline>;

export const TimelineCreated = {
  build: DomainEvent.buildFn(name, Timeline.aggregateType),
} as const;
