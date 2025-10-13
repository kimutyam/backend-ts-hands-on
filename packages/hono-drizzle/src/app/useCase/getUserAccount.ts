import type { GetUserAccount } from '../port/primary/management/getUserAccount.js';
import { FindUserAccountById } from '../port/secondary/persistence/userAccountRepository.js';

const build =
  (findUserAccountById: FindUserAccountById): GetUserAccount =>
  (userAccountId) =>
    findUserAccountById(userAccountId).unwrapOr(undefined);

build.inject = [FindUserAccountById.token] as const;

const GetUserAccountUseCase = {
  build,
} as const;

export { GetUserAccountUseCase };
