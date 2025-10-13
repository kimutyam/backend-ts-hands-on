import type { Injector } from 'typed-inject';

import type { StoreProductEvent } from '../../../app/port/secondary/persistence/productEventStore.js';
import type { FindUserAccountById } from '../../../app/port/secondary/persistence/userAccountRepository.js';
import { MemoryAdaptorInjector } from './memory/injectorForManagement.js';
import { RdbAdaptorInjector } from './rdb/injectorForManagement.js';

type PersistencePortInjector = Injector<{
  [FindUserAccountById.token]: FindUserAccountById;
  [StoreProductEvent.token]: StoreProductEvent;
}>;

const PersistencePortInjector = {
  createOnRdb: RdbAdaptorInjector.create,
  createOnMemory: MemoryAdaptorInjector.create,
} as const;

export { PersistencePortInjector };
