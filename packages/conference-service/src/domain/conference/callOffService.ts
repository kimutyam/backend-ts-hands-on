import type { ApplicationError } from '../../util/applicationError';
import type { Result } from '../../util/result';
import { Failure, Success } from '../../util/result';
import { Timeline } from '../timeline';
import type { TimelineStatus } from '../timeline';
import { CalledOff } from './calledOff';
import type { Conference } from './conference';

const CallOffErrorKind = 'ConferenceCallOffError';
export type CallOffError = ApplicationError<
  typeof CallOffErrorKind,
  Readonly<{
    status: TimelineStatus;
  }>
>;

export const CallOffError = (status: TimelineStatus): CallOffError => ({
  kind: CallOffErrorKind,
  message: '開催確定すると中止できません',
  detail: { status },
});

export const CallOffService = (
  conference: Conference,
  timeline: Timeline,
  reason: string,
  now: Date,
): Result<CallOffError, CalledOff> => {
  const [enableChangeRestriction, status] = Timeline.enableChangeRestriction(now)(timeline);
  if (enableChangeRestriction) {
    return Failure(CallOffError(status));
  }
  return Success(CalledOff.build(conference.aggregateId, { reason }));
};
