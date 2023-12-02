import type { ApplicationError } from '../../util/applicationError';
import type { WithAggregateId } from '../../util/resolver';
import type { ConferenceId } from '../conference';

const kind = 'RestrictionNotFoundError';
export type RestrictionNotFoundError = ApplicationError<
  typeof kind,
  Readonly<WithAggregateId<ConferenceId>>
>;
export const RestrictionNotFoundError = (conferenceId: ConferenceId): RestrictionNotFoundError => ({
  kind,
  message: '参加制限が存在しません',
  detail: { aggregateId: conferenceId },
});
