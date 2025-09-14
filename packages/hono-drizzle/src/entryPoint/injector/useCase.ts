import { GetUserAccount } from '../../app/port/primary/getUserAccount.js';
import { buildGetUserAccount } from '../../app/useCase/getUserAccount.js';
import { RdbInjector } from './rdb.js';

const create = () =>
  RdbInjector.create().provideFactory(
    GetUserAccount.token,
    buildGetUserAccount,
  );

type UseCaseInjector = ReturnType<typeof create>;
const UseCaseInjector = {
  create,
} as const;

export { UseCaseInjector };
