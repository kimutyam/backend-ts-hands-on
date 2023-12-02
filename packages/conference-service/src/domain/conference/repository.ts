import type { EventStore } from '../../util/domainEvent';
import type { AggregateResolver } from '../../util/resolver';
import type { CalledOff } from './calledOff';
import type { Conference } from './conference';
import type { ConferenceId } from './conferenceId';
import type { Drafted } from './drafted';
import type { Published } from './published';

export type ConferenceResolver = AggregateResolver<ConferenceId, Conference>;

export type DraftedStore = EventStore<Drafted>;

export type PublishedStore = EventStore<Published>;

export type CalledOffStore = EventStore<CalledOff>;
