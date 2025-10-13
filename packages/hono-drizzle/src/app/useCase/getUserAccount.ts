import type { GetUserAccount } from '../port/primary/management/getUserAccount.js';
import { FindUserAccountById } from '../port/secondary/persistence/userAccountRepository.js';

const create =
  (findUserAccountById: FindUserAccountById): GetUserAccount =>
  (userAccountId) =>
    findUserAccountById(userAccountId).unwrapOr(undefined);

create.inject = [FindUserAccountById.token] as const;

const GetUserAccountUseCase = {
  create,
} as const;

export { GetUserAccountUseCase };
