import type { ApplicationError } from '../../util/applicationError';
import type { WithAggregateId } from '../../util/resolver';
import type { ConferenceId } from './conferenceId';

const kind = 'ConferenceNotFoundError';
export type ConferenceNotFoundError = ApplicationError<
  typeof kind,
  Readonly<WithAggregateId<ConferenceId>>
>;
export const ConferenceNotFoundError = (conferenceId: ConferenceId): ConferenceNotFoundError => ({
  kind,
  message: 'カンファレンスが存在しません',
  detail: { aggregateId: conferenceId },
});
