import { createInjector } from 'typed-inject';

import { CartEventStore } from '../../adaptors/secondary/rdb/cartEventStore.js';
import { CartRepository } from '../../adaptors/secondary/rdb/cartRepository.js';
import { Db } from '../../adaptors/secondary/rdb/db.js';
import { PgPool } from '../../adaptors/secondary/rdb/pgPool.js';
import { UserAccountRepository } from '../../adaptors/secondary/rdb/userAccountRepository.js';
import { StoreCartEvent } from '../../ports/secondary/cartEventStore.js';
import { FindCartById } from '../../ports/secondary/cartRepository.js';
import { FindUserAccountById } from '../../ports/secondary/userAccountRepository.js';

const create = () =>
  createInjector()
    .provideFactory(PgPool.token, PgPool.build)
    .provideFactory(Db.token, Db.build)
    .provideFactory(
      FindUserAccountById.token,
      UserAccountRepository.buildFindById,
    )
    .provideFactory(FindCartById.token, CartRepository.buildFindById)
    .provideFactory(StoreCartEvent.token, CartEventStore.buildStore);

type PostgreSQLInjector = ReturnType<typeof create>;
const PostgreSQLInjector = {
  create,
} as const;

export { PostgreSQLInjector };
