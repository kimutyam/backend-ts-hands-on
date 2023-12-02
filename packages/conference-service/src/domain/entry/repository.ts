import type { EventStore } from '../../util/domainEvent';
import type { AggregateResolver } from '../../util/resolver';
import type { Entry } from './entry';
import type { EntryApplied } from './entryApplied';
import type { EntryId } from './entryId';

export type EntryResolver = AggregateResolver<EntryId, Entry>;

export type EntryAppliedStore = EventStore<EntryApplied>;
