import type { Result } from '../../util/result';
import { Failure, Success } from '../../util/result';
import { Timeline } from '../timeline';
import { CalledOff } from './calledOff';
import { CallOffError } from './callOffError';
import type { Conference } from './conference';

export const CallOffService = (
  conference: Conference,
  timeline: Timeline,
  reason: string,
  now: Date,
): Result<CallOffError, CalledOff> => {
  const [enableChangeRestriction, status] = Timeline.enableChangeRestriction(now)(timeline);
  if (enableChangeRestriction) {
    return Failure(new CallOffError(status));
  }
  return Success(CalledOff.build(conference.aggregateId, { reason }));
};
