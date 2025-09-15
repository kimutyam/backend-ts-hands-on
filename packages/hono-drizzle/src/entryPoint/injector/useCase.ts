import { GetUserAccount } from '../../app/port/primary/getUserAccount.js';
import { buildGetUserAccount } from '../../app/useCase/getUserAccount.js';
import type { RdbInjector } from './rdb.js';

const create = (rdbInjector: RdbInjector) =>
  rdbInjector.provideFactory(GetUserAccount.token, buildGetUserAccount);

type UseCaseInjector = ReturnType<typeof create>;
const UseCaseInjector = {
  create,
} as const;

export { UseCaseInjector };
