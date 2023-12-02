import { DomainEvent } from '../../util/domainEvent';
import { Entry } from './entry';

const eventType = 'EntryApplied';
export type EntryApplied = DomainEvent<typeof eventType, Entry>;
export const EntryApplied = {
  build: DomainEvent.buildFn<EntryApplied['eventType']>(eventType, Entry.aggregateType),
} as const;
