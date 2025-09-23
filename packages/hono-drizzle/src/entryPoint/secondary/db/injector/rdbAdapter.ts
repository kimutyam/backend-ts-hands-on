import type { Injector } from 'typed-inject';

import { CartEventStore } from '../../../../adapter/secondary/db/rdb/cartEventStore.js';
import { CartRepository } from '../../../../adapter/secondary/db/rdb/cartRepository.js';
import { Db } from '../../../../adapter/secondary/db/rdb/db.js';
import { ProductEventStore } from '../../../../adapter/secondary/db/rdb/productEventStore.js';
import { ProductRepository } from '../../../../adapter/secondary/db/rdb/productRepository.js';
import { UserAccountRepository } from '../../../../adapter/secondary/db/rdb/userAccountRepository.js';
import { StoreCartEvent } from '../../../../app/port/secondary/db/cartEventStore.js';
import { FindCartById } from '../../../../app/port/secondary/db/cartRepository.js';
import { StoreProductEvent } from '../../../../app/port/secondary/db/productEventStore.js';
import { FindProductById } from '../../../../app/port/secondary/db/productRepository.js';
import { FindUserAccountById } from '../../../../app/port/secondary/db/userAccountRepository.js';
import type { DbPortInjector } from './port.js';
import { DatabaseUrl } from '../../../../adapter/secondary/db/rdb/databaseUrl.js';

const create = (rootInjector: Injector, databaseUrl: string): DbPortInjector =>
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
