import type { UserAccount } from 'sample/domain/userAccount.js';
import { FindUserAccount } from 'sample/domain/userAccountRepository.js';

type GetUserAccount = (
  userAccountId: string,
) => Promise<UserAccount | undefined>;

const build =
  (findUserAccount: FindUserAccount): GetUserAccount =>
  (userAccountId: string): ReturnType<GetUserAccount> =>
    findUserAccount(userAccountId).unwrapOr(undefined);

build.inject = [FindUserAccount.token] as const;

const GetUserAccount = {
  token: 'GetUserAccount' as const,
  build,
} as const;

export { GetUserAccount };
