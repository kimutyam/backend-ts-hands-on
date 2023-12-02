import { DomainEvent } from '../../util/domainEvent';
import type { ConferenceId } from '../conference';
import { Restriction } from './restriction';

const eventType = 'RestrictionCreated';
export type RestrictionCreated = DomainEvent<typeof eventType, ConferenceId, Restriction>;

export const RestrictionCreated = {
  build: DomainEvent.buildFn<RestrictionCreated['eventType']>(eventType, Restriction.aggregateType),
} as const;
