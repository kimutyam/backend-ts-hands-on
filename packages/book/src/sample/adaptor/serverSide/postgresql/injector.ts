import { Db } from 'sample/adaptor/serverSide/postgresql/db.js';
import { buildFindUserAccount } from 'sample/adaptor/serverSide/postgresql/findUserAccount.js';
import { FindUserAccount } from 'sample/domain/userAccountRepository.js';
import { createInjector } from 'typed-inject';

const create = () =>
  createInjector()
    .provideFactory(Db.token, Db.build)
    .provideFactory(FindUserAccount.token, buildFindUserAccount);

type PostgreSQLInjector = ReturnType<typeof create>;
const PostgreSQLInjector = {
  create,
} as const;

export { PostgreSQLInjector };
