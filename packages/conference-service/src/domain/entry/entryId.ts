import type { ConferenceId } from '../conference';
import type { UserAccountId } from '../userAccount/userAccountId';

export type EntryId = Readonly<{
  userAccountId: UserAccountId;
  conferenceId: ConferenceId;
}>;
