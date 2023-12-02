import type { WithAggregateId } from '../../util/resolver';
import type { ConferenceId } from '../conference';
import type { MaxNumberOfParticipants } from './maxNumberOfParticipants';
import { RestrictionChanged } from './restrictionChanged';
import { RestrictionCreated } from './restrictionCreated';

export type Restriction = WithAggregateId<ConferenceId> &
  Readonly<{
    maxLimit: MaxNumberOfParticipants;
  }>;

const aggregateType = 'Restriction';

const create = (restriction: Restriction): RestrictionCreated =>
  RestrictionCreated.build(restriction.aggregateId, restriction);

const change =
  (maxLimit: MaxNumberOfParticipants) =>
  (base: Restriction): RestrictionChanged =>
    RestrictionChanged.build(base.aggregateId, {
      before: { maxLimit: base.maxLimit },
      after: { maxLimit },
    });

export const Restriction = {
  create,
  change,
  aggregateType,
} as const;
