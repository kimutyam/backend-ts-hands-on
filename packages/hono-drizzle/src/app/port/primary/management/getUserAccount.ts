import type { UserAccount } from '../../../domain/userAccount/userAccount.js';

type GetUserAccount = (
  userAccountId: string,
) => Promise<UserAccount | undefined>;

const GetUserAccount = {
  token: 'GetUserAccount',
} as const;

export { GetUserAccount };
