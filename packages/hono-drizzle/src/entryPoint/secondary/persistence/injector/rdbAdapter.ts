import type { Injector } from 'typed-inject';

import { CartEventStore } from '../../../../adapter/secondary/persistence/rdb/cartEventStore.js';
import { CartRepository } from '../../../../adapter/secondary/persistence/rdb/cartRepository.js';
import { DatabaseUrl } from '../../../../adapter/secondary/persistence/rdb/databaseUrl.js';
import { Db } from '../../../../adapter/secondary/persistence/rdb/db.js';
import { ProductEventStore } from '../../../../adapter/secondary/persistence/rdb/productEventStore.js';
import { ProductRepository } from '../../../../adapter/secondary/persistence/rdb/productRepository.js';
import { UserAccountRepository } from '../../../../adapter/secondary/persistence/rdb/userAccountRepository.js';
import { StoreCartEvent } from '../../../../app/port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '../../../../app/port/secondary/persistence/cartRepository.js';
import { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import { FindProductById } from '../../../../app/port/secondary/persistence/productRepository.js';
import { FindUserAccountById } from '../../../../app/port/secondary/persistence/userAccountRepository.js';
import type { PersistencePortInjector } from './port.js';

const create = (
  rootInjector: Injector,
  databaseUrl: string,
): PersistencePortInjector =>
  rootInjector
    .provideValue(DatabaseUrl.token, databaseUrl)
    .provideFactory(Db.token, Db.build)
    .provideFactory(FindUserAccountById.token, UserAccountRepository.findById)
    .provideFactory(FindCartById.token, CartRepository.findById)
    .provideFactory(StoreCartEvent.token, CartEventStore.store)
    .provideFactory(FindProductById.token, ProductRepository.findById)
    .provideFactory(StoreProductEvent.token, ProductEventStore.store);

const RdbAdaptorInjector = {
  create,
} as const;

export { RdbAdaptorInjector };
