import type { GetUserAccount } from '../port/primary/management/getUserAccount.js';
import { FindUserAccountById } from '../port/secondary/persistence/userAccountRepository.js';

const buildGetUserAccount =
  (findUserAccountById: FindUserAccountById): GetUserAccount =>
  (userAccountId) =>
    findUserAccountById(userAccountId).unwrapOr(undefined);

buildGetUserAccount.inject = [FindUserAccountById.token] as const;

export { buildGetUserAccount };
