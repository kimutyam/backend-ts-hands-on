import type { Injector } from 'typed-inject';

import { CartEventStore } from '../../../../adapter/secondary/db/rdb/cartEventStore.js';
import { CartRepository } from '../../../../adapter/secondary/db/rdb/cartRepository.js';
import { Db } from '../../../../adapter/secondary/db/rdb/db.js';
import { PgPool } from '../../../../adapter/secondary/db/rdb/pgPool.js';
import { UserAccountRepository } from '../../../../adapter/secondary/db/rdb/userAccountRepository.js';
import { StoreCartEvent } from '../../../../app/port/secondary/db/cartEventStore.js';
import { FindCartById } from '../../../../app/port/secondary/db/cartRepository.js';
import { FindUserAccountById } from '../../../../app/port/secondary/db/userAccountRepository.js';
import type { DbPortInjector } from './port.js';

const create = (rootInjector: Injector): DbPortInjector =>
  rootInjector
    .provideFactory(PgPool.token, PgPool.build)
    .provideFactory(Db.token, Db.build)
    .provideFactory(FindUserAccountById.token, UserAccountRepository.findById)
    .provideFactory(FindCartById.token, CartRepository.findById)
    .provideFactory(StoreCartEvent.token, CartEventStore.store);

const RdbAdaptorInjector = {
  create,
} as const;

export { RdbAdaptorInjector };
