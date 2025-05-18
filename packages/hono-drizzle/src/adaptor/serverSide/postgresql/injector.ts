import { createInjector } from 'typed-inject';

import { CartEventStore } from '../../../domain/cart/cartEventStore.js';
import { FindCartById } from '../../../domain/cart/cartRepository.js';
import { FindUserAccount } from '../../../domain/userAccount/userAccountRepository.js';
import { buildCartEventStore } from './cartEventStore.js';
import { Db } from './db.js';
import { buildFindCartById } from './findCartById.js';
import { buildFindUserAccount } from './findUserAccount.js';
import { PgPool } from './pgPool.js';

const create = () =>
  createInjector()
    .provideFactory(PgPool.token, PgPool.build)
    .provideFactory(Db.token, Db.build)
    .provideFactory(FindUserAccount.token, buildFindUserAccount)
    .provideFactory(FindCartById.token, buildFindCartById)
    .provideFactory(CartEventStore.token, buildCartEventStore);

type PostgreSQLInjector = ReturnType<typeof create>;
const PostgreSQLInjector = {
  create,
} as const;

export { PostgreSQLInjector };
