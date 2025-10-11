import type { Injector } from 'typed-inject';

import type { StoreCartEvent } from '../../../../app/port/secondary/persistence/cartEventStore.js';
import type { FindCartById } from '../../../../app/port/secondary/persistence/cartRepository.js';
import type { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import type { FindProductById } from '../../../../app/port/secondary/persistence/productRepository.js';
import type { FindUserAccountById } from '../../../../app/port/secondary/persistence/userAccountRepository.js';
import { MemoryAdaptorInjector } from './memoeryAdapter.js';
import { RdbAdaptorInjector } from './rdbAdapter.js';

type PersistencePortInjector = Injector<{
  [FindUserAccountById.token]: FindUserAccountById;
  [FindCartById.token]: FindCartById;
  [StoreCartEvent.token]: StoreCartEvent;
  [FindProductById.token]: FindProductById;
  [StoreProductEvent.token]: StoreProductEvent;
}>;

const PersistencePortInjector = {
  createOnRdb: RdbAdaptorInjector.create,
  createOnMemory: MemoryAdaptorInjector.create,
} as const;

export { PersistencePortInjector };
