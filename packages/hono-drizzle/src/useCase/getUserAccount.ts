import type { GetUserAccount } from '../ports/primary/getUserAccount.js';
import { FindUserAccountById } from '../ports/secondary/userAccountRepository.js';

const buildGetUserAccount =
  (findUserAccountById: FindUserAccountById): GetUserAccount =>
  (userAccountId: string) =>
    findUserAccountById(userAccountId).unwrapOr(undefined);

buildGetUserAccount.inject = [FindUserAccountById.token] as const;

export { buildGetUserAccount };
