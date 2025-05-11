import { PostgreSQLInjector } from '../adaptor/serverSide/postgresql/injector.js';
import { GetUserAccount } from '../useCase/getUserAccount.js';

const create = () =>
  PostgreSQLInjector.create().provideFactory(
    GetUserAccount.token,
    GetUserAccount.build,
  );

type UseCaseInjector = ReturnType<typeof create>;
const UseCaseInjector = {
  create,
} as const;

export { UseCaseInjector };
