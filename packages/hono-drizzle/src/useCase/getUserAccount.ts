import type { UserAccount } from '../domain/userAccount/userAccount.js';
import { FindUserAccountById } from '../domain/userAccount/userAccountRepository.js';

type GetUserAccount = (
  userAccountId: string,
) => Promise<UserAccount | undefined>;

const build =
  (findUserAccountById: FindUserAccountById): GetUserAccount =>
  (userAccountId: string): ReturnType<GetUserAccount> =>
    findUserAccountById(userAccountId).unwrapOr(undefined);

build.inject = [FindUserAccountById.token] as const;

const GetUserAccount = {
  token: 'GetUserAccount' as const,
  build,
} as const;

export { GetUserAccount };
