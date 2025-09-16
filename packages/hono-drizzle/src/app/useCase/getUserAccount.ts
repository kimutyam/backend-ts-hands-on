import type { GetUserAccount } from '../port/primary/management/getUserAccount.js';
import { FindUserAccountById } from '../port/secondary/db/userAccountRepository.js';

const buildGetUserAccount =
  (findUserAccountById: FindUserAccountById): GetUserAccount =>
  (userAccountId: string) =>
    findUserAccountById(userAccountId).unwrapOr(undefined);

buildGetUserAccount.inject = [FindUserAccountById.token] as const;

export { buildGetUserAccount };
