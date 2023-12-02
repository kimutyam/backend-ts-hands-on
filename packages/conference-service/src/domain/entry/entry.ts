import type { WithAggregateId } from '../../util/resolver';
import type { ConferenceId } from '../conference';
import type { UserAccountId } from '../userAccount/userAccountId';
import { EntryApplied } from './entered';

export type Entry = WithAggregateId<{ userAccountId: UserAccountId; conferenceId: ConferenceId }>;
const aggregateType = 'Entry';

const build = (userAccountId: UserAccountId, conferenceId: ConferenceId): Entry => ({
  aggregateId: { userAccountId, conferenceId },
});

const apply = (entry: Entry): EntryApplied => EntryApplied.build(entry);
export const Entry = {
  build,
  apply,
  aggregateType,
} as const;
