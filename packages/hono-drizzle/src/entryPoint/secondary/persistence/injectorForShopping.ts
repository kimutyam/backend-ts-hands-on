import type { Injector } from 'typed-inject';

import type { StoreCartEvent } from '../../../app/port/secondary/persistence/cartEventStore.js';
import type { FindCartById } from '../../../app/port/secondary/persistence/cartRepository.js';
import type { FindProductById } from '../../../app/port/secondary/persistence/productRepository.js';
import type { FindUserAccountById } from '../../../app/port/secondary/persistence/userAccountRepository.js';
import { MemoryAdaptorInjector } from './memory/injectorForShopping.js';
import { RdbAdaptorInjector } from './rdb/injectorForShopping.js';

type PersistencePortInjector = Injector<{
  [FindUserAccountById.token]: FindUserAccountById;
  [FindCartById.token]: FindCartById;
  [StoreCartEvent.token]: StoreCartEvent;
  [FindProductById.token]: FindProductById;
}>;

const PersistencePortInjector = {
  createOnRdb: RdbAdaptorInjector.create,
  createOnMemory: MemoryAdaptorInjector.create,
} as const;

export { PersistencePortInjector };
