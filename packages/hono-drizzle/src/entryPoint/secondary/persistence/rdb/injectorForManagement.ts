import type { Injector } from 'typed-inject';

import { DatabaseUrl } from '../../../../adapter/secondary/persistence/rdb/databaseUrl.js';
import { Db } from '../../../../adapter/secondary/persistence/rdb/db.js';
import { ProductEventStore } from '../../../../adapter/secondary/persistence/rdb/productEventStore.js';
import { UserAccountRepository } from '../../../../adapter/secondary/persistence/rdb/userAccountRepository.js';
import { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import { FindUserAccountById } from '../../../../app/port/secondary/persistence/userAccountRepository.js';
import type { PersistencePortInjector } from '../injectorForManagement.js';

const create = (
  rootInjector: Injector,
  databaseUrl: string,
): PersistencePortInjector =>
  rootInjector
    .provideValue(DatabaseUrl.token, databaseUrl)
    .provideFactory(Db.token, Db.create)
    .provideFactory(
      FindUserAccountById.token,
      UserAccountRepository.createFindByIdFn,
    )
    .provideFactory(StoreProductEvent.token, ProductEventStore.createStoreFn);

const RdbAdaptorInjector = {
  create,
} as const;

export { RdbAdaptorInjector };
