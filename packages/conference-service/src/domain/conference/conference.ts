import type { WithAggregateId } from '../../util/resolver';
import type { Result } from '../../util/result';
import { Failure, Success } from '../../util/result';
import type { ConferenceId } from './conferenceId';
import { Drafted } from './drafted';
import type { PublicStatus } from './publicStatus';
import { PUBLIC_STATUS } from './publicStatus';
import { Published } from './published';
import { PublishError } from './publishError';

export type Conference = WithAggregateId<ConferenceId> &
  Readonly<{
    publicStatus: PublicStatus;
  }>;

const aggregateType = 'Conference';

const isPublished = ({ publicStatus }: Conference): boolean =>
  publicStatus === PUBLIC_STATUS.PUBLISHED;

const publish = (conference: Conference): Result<PublishError, Published> =>
  isPublished(conference)
    ? Failure(new PublishError(conference))
    : Success(Published.build(conference.aggregateId));

const draft = (aggregateId: ConferenceId): Drafted => Drafted.build(aggregateId);
export const Conference = {
  publish,
  draft,
  isPublished,
  aggregateType,
} as const;
