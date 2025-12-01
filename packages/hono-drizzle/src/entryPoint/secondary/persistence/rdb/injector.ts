import type { Injector } from 'typed-inject';

import { CartEventStore } from '../../../../adapter/secondary/persistence/rdb/cartEventStore.js';
import { CartRepository } from '../../../../adapter/secondary/persistence/rdb/cartRepository.js';
import { DatabaseUrl } from '../../../../adapter/secondary/persistence/rdb/databaseUrl.js';
import { Db } from '../../../../adapter/secondary/persistence/rdb/db.js';
import { ProductEventStore } from '../../../../adapter/secondary/persistence/rdb/productEventStore.js';
import { ProductRepository } from '../../../../adapter/secondary/persistence/rdb/productRepository.js';
import { StoreCartEvent } from '../../../../app/port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '../../../../app/port/secondary/persistence/cartRepository.js';
import { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import { FindProductById } from '../../../../app/port/secondary/persistence/productRepository.js';
import type { PersistencePortInjector } from '../injector.js';

const create = (
  rootInjector: Injector,
  databaseUrl: string,
): PersistencePortInjector =>
  rootInjector
    .provideValue(DatabaseUrl.token, databaseUrl)
    .provideFactory(Db.token, Db.create)
    .provideFactory(StoreProductEvent.token, ProductEventStore.createStoreFn)
    .provideFactory(FindCartById.token, CartRepository.createFindByIdFn)
    .provideFactory(StoreCartEvent.token, CartEventStore.createStoreFn)
    .provideFactory(FindProductById.token, ProductRepository.createFindByIdFn);

const RdbAdaptorInjector = {
  create,
} as const;

export { RdbAdaptorInjector };
