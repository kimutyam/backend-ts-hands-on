import type { ApplicationError } from '../../util/applicationError';
import type { Result } from '../../util/result';
import { Failure, Success } from '../../util/result';
import type { TimelineStatus } from '../timeline';
import { Timeline } from '../timeline';
import type { MaxNumberOfParticipants } from './maxNumberOfParticipants';
import { Restriction } from './restriction';
import type { RestrictionChanged } from './restrictionChanged';

const RestrictionChangeErrorKind = 'RestrictionChangeError';
export type RestrictionChangeError = ApplicationError<
  typeof RestrictionChangeErrorKind,
  Readonly<{
    status: TimelineStatus;
  }>
>;

export const RestrictionChangeError = (status: TimelineStatus): RestrictionChangeError => ({
  kind: RestrictionChangeErrorKind,
  message: '応募期間を過ぎると参加上限数を変更できません',
  detail: { status },
});

export const RestrictionChangeService = (
  timeline: Timeline,
  restriction: Restriction,
  maxLimit: MaxNumberOfParticipants,
  now: Date,
): Result<RestrictionChangeError, RestrictionChanged> => {
  const [enableChangeRestriction, status] = Timeline.enableChangeRestriction(now)(timeline);
  if (enableChangeRestriction) {
    return Failure(RestrictionChangeError(status));
  }
  return Success(Restriction.change(maxLimit)(restriction));
};
