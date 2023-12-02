import type { EventStore } from '../../util/domainEvent';
import type { AggregateResolver } from '../../util/resolver';
import type { ConferenceId } from '../conference';
import type { Restriction } from './restriction';
import type { RestrictionChanged } from './restrictionChanged';
import type { RestrictionCreated } from './restrictionCreated';

export type RestrictionResolver = AggregateResolver<ConferenceId, Restriction>;

export type RestrictionCreatedStore = EventStore<RestrictionCreated>;

export type RestrictionChangedStore = EventStore<RestrictionChanged>;
