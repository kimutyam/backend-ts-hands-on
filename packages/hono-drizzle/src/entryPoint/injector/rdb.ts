import { createInjector } from 'typed-inject';

import { CartEventStore } from '../../adapter/secondary/rdb/cartEventStore.js';
import { CartRepository } from '../../adapter/secondary/rdb/cartRepository.js';
import { Db } from '../../adapter/secondary/rdb/db.js';
import { PgPool } from '../../adapter/secondary/rdb/pgPool.js';
import { UserAccountRepository } from '../../adapter/secondary/rdb/userAccountRepository.js';
import { StoreCartEvent } from '../../app/port/secondary/cartEventStore.js';
import { FindCartById } from '../../app/port/secondary/cartRepository.js';
import { FindUserAccountById } from '../../app/port/secondary/userAccountRepository.js';

const create = () =>
  createInjector()
    .provideFactory(PgPool.token, PgPool.build)
    .provideFactory(Db.token, Db.build)
    .provideFactory(FindUserAccountById.token, UserAccountRepository.findById)
    .provideFactory(FindCartById.token, CartRepository.findById)
    .provideFactory(StoreCartEvent.token, CartEventStore.store);

type RdbInjector = ReturnType<typeof create>;
const RdbInjector = {
  create,
} as const;

export { RdbInjector };
