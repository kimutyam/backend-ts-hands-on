import { GetUserAccount } from '../../ports/primary/getUserAccount.js';
import { buildGetUserAccount } from '../../useCase/getUserAccount.js';
import { PostgreSQLInjector } from './rdb.js';

// injectorを組み立てるのはAdaptorだけにする？
const create = () =>
  PostgreSQLInjector.create().provideFactory(
    GetUserAccount.token,
    buildGetUserAccount,
  );

type UseCaseInjector = ReturnType<typeof create>;
const UseCaseInjector = {
  create,
} as const;

export { UseCaseInjector };
