import type { EventStore } from '../../util/domainEvent';
import type { NominalName } from '../../util/nominal';
import type { AggregateResolver } from '../../util/nominalAdaptor/resolver';
import type { ConferenceId } from '../conference';
import type { Timeline } from './timeline';
import type { TimelineCreated } from './timelineCreated';
import type { TimelineUpdated } from './timelineUpdated';

export type TimelineResolver = AggregateResolver<ConferenceId, NominalName<Timeline>, Timeline>;

export type TimelineCreatedStore = EventStore<TimelineCreated>;

export type TimelineUpdatedStore = EventStore<TimelineUpdated>;
