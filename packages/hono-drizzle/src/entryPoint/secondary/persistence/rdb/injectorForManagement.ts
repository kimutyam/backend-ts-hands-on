import type { Injector } from 'typed-inject';

import { DatabaseUrl } from '../../../../adapter/secondary/persistence/rdb/databaseUrl.js';
import { Db } from '../../../../adapter/secondary/persistence/rdb/db.js';
import { ProductEventStore } from '../../../../adapter/secondary/persistence/rdb/productEventStore.js';
import { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import type { PersistencePortInjector } from '../injectorForManagement.js';

const create = (
  rootInjector: Injector,
  databaseUrl: string,
): PersistencePortInjector =>
  rootInjector
    .provideValue(DatabaseUrl.token, databaseUrl)
    .provideFactory(Db.token, Db.create)
    .provideFactory(StoreProductEvent.token, ProductEventStore.createStoreFn);

const RdbAdaptorInjector = {
  create,
} as const;

export { RdbAdaptorInjector };
