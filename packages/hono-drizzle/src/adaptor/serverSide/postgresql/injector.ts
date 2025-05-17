import { createInjector } from 'typed-inject';

import { FindUserAccount } from '../../../domain/userAccount/userAccountRepository.js';
import { Db } from './db.js';
import { buildFindUserAccount } from './findUserAccount.js';

const create = () =>
  createInjector()
    .provideFactory(Db.token, Db.build)
    .provideFactory(FindUserAccount.token, buildFindUserAccount);

type PostgreSQLInjector = ReturnType<typeof create>;
const PostgreSQLInjector = {
  create,
} as const;

export { PostgreSQLInjector };
