import type { ApplicationError } from '../../util/applicationError';
import type { WithAggregateId } from '../../util/resolver';
import type { ConferenceId } from '../conference';

const kind = 'TimelineNotFoundError';
export type TimelineNotFoundError = ApplicationError<
  typeof kind,
  Readonly<WithAggregateId<ConferenceId>>
>;
export const TimelineNotFoundError = (conferenceId: ConferenceId): TimelineNotFoundError => ({
  kind,
  message: 'タイムラインが存在しません',
  detail: { aggregateId: conferenceId },
});
