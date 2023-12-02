import type { Result } from '../../util/result';
import { Failure, Success } from '../../util/result';
import { Timeline } from '../timeline';
import type { MaxNumberOfParticipants } from './maxNumberOfParticipants';
import { Restriction } from './restriction';
import type { RestrictionChanged } from './restrictionChanged';
import { RestrictionChangeError } from './restrictionChangeError';

export const RestrictionChangeService = (
  timeline: Timeline,
  restriction: Restriction,
  maxLimit: MaxNumberOfParticipants,
  now: Date,
): Result<RestrictionChangeError, RestrictionChanged> => {
  const [enableChangeRestriction, status] = Timeline.enableChangeRestriction(now)(timeline);
  if (enableChangeRestriction) {
    return Failure(new RestrictionChangeError(status));
  }
  return Success(Restriction.change(maxLimit)(restriction));
};
