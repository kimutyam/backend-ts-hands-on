import type { ApplicationError } from '../../util/applicationError';
import type { Result } from '../../util/result';
import { Failure, Success } from '../../util/result';
import type { ConferenceId } from '../conference';
import type { TimelineStatus } from '../timeline';
import { Timeline } from '../timeline';
import type { UserAccountId } from '../userAccount/userAccountId';
import type { EntryApplied } from './entered';
import { Entry } from './entry';

const EntryErrorKind = 'EntryError';
export type EntryError = ApplicationError<
  typeof EntryErrorKind,
  Readonly<{
    status: TimelineStatus;
  }>
>;

export const EntryError = (status: TimelineStatus): EntryError => ({
  kind: EntryErrorKind,
  message: '応募期間中ではありません',
  detail: { status },
});

export const EntryService = (
  timeline: Timeline,
  userAccountId: UserAccountId,
  conferenceId: ConferenceId,
  now: Date,
): Result<EntryError, EntryApplied> => {
  const [enableChangeRestriction, status] = Timeline.enableEntry(now)(timeline);
  if (enableChangeRestriction) {
    return Failure(EntryError(status));
  }
  return Success(Entry.apply(Entry.build(userAccountId, conferenceId)));
};
