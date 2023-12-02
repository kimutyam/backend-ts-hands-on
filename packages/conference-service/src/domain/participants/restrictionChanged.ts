import { DomainEvent } from '../../util/domainEvent';
import type { ConferenceId } from '../conference';
import type { MaxNumberOfParticipants } from './maxNumberOfParticipants';
import { Restriction } from './restriction';

const eventType = 'RestrictionChanged';
export type RestrictionChanged = DomainEvent<
  typeof eventType,
  ConferenceId,
  { before: { maxLimit: MaxNumberOfParticipants }; after: { maxLimit: MaxNumberOfParticipants } }
>;
export const RestrictionChanged = {
  build: DomainEvent.buildFn(eventType, Restriction.aggregateType),
} as const;
