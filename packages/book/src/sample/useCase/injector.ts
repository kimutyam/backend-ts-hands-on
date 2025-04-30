import { PostgreSQLInjector } from 'sample/adaptor/serverSide/postgresql/injector.js';
import { GetUserAccount } from 'sample/useCase/getUserAccount.js';

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
