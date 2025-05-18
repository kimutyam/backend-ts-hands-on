import { createInjector } from 'typed-inject';

import { CartEventStore } from '../../../domain/cart/cartEventStore.js';
import { FindCartById } from '../../../domain/cart/cartRepository.js';
import { FindUserAccountById } from '../../../domain/userAccount/userAccountRepository.js';
import { buildCartEventStore } from './cart/cartEventStore.js';
import { buildFindCartById } from './cart/findCartById.js';
import { Db } from './db.js';
import { PgPool } from './pgPool.js';
import { buildFindUserAccountById } from './userAccount/findUserAccountById.js';

const create = () =>
  createInjector()
    .provideFactory(PgPool.token, PgPool.build)
    .provideFactory(Db.token, Db.build)
    .provideFactory(FindUserAccountById.token, buildFindUserAccountById)
    .provideFactory(FindCartById.token, buildFindCartById)
    .provideFactory(CartEventStore.token, buildCartEventStore);

type PostgreSQLInjector = ReturnType<typeof create>;
const PostgreSQLInjector = {
  create,
} as const;

export { PostgreSQLInjector };
