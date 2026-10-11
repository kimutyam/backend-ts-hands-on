import type { Injector } from 'typed-inject';

import { CartRepositoryOnRdb } from '#/adapter/secondary/persistence/rdb/cartRepositoryOnRdb.js';
import { DatabaseUrl } from '#/adapter/secondary/persistence/rdb/databaseUrl.js';
import { Db } from '#/adapter/secondary/persistence/rdb/db.js';
import { ProductRepositoryOnRdb } from '#/adapter/secondary/persistence/rdb/productRepositoryOnRdb.js';
import { StoreCartEventOnRdb } from '#/adapter/secondary/persistence/rdb/storeCartEventOnRdb.js';
import { StoreProductEventOnRdb } from '#/adapter/secondary/persistence/rdb/storeProductEventOnRdb.js';
import { StoreCartEvent } from '#/app/port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '#/app/port/secondary/persistence/cartRepository.js';
import { StoreProductEvent } from '#/app/port/secondary/persistence/productEventStore.js';
import { FindProductById } from '#/app/port/secondary/persistence/productRepository.js';
import type { PersistencePortInjector } from '#/entryPoint/secondary/persistence/injector.js';

const create = (
  rootInjector: Injector,
  databaseUrl: DatabaseUrl,
): PersistencePortInjector =>
  rootInjector
    .provideValue(DatabaseUrl.token, databaseUrl)
    .provideFactory(Db.token, Db.getInstance)
    .provideFactory(
      FindProductById.token,
      ProductRepositoryOnRdb.createFindByIdFn,
    )
    .provideFactory(
      StoreProductEvent.token,
      StoreProductEventOnRdb.createStoreFn,
    )
    .provideFactory(FindCartById.token, CartRepositoryOnRdb.createFindByIdFn)
    .provideFactory(StoreCartEvent.token, StoreCartEventOnRdb.createStoreFn);

const RdbAdapterInjector = {
  create,
} as const;

export { RdbAdapterInjector };
