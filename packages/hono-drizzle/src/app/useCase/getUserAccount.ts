import type { GetUserAccount } from '../port/primary/getUserAccount.js';
import { FindUserAccountById } from '../port/secondary/userAccountRepository.js';

const buildGetUserAccount =
  (findUserAccountById: FindUserAccountById): GetUserAccount =>
  (userAccountId: string) =>
    findUserAccountById(userAccountId).unwrapOr(undefined);

buildGetUserAccount.inject = [FindUserAccountById.token] as const;

export { buildGetUserAccount };
