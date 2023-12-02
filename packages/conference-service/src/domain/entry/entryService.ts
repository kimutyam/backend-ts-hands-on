import type { Result } from '../../util/result';
import { Failure, Success } from '../../util/result';
import type { ConferenceId } from '../conference';
import { Timeline } from '../timeline';
import type { UserAccountId } from '../userAccount/userAccountId';
import { Entry } from './entry';
import type { EntryApplied } from './entryApplied';
import { EntryError } from './entryError';

export const EntryService = (
  timeline: Timeline,
  userAccountId: UserAccountId,
  conferenceId: ConferenceId,
  now: Date,
): Result<EntryError, EntryApplied> => {
  const [enableChangeRestriction, status] = Timeline.enableEntry(now)(timeline);
  if (enableChangeRestriction) {
    return Failure(new EntryError(status));
  }
  return Success(Entry.apply(Entry.build(userAccountId, conferenceId)));
};
