import type { Injector } from 'typed-inject';

import type { StoreCartEvent } from '../../../app/port/secondary/persistence/cartEventStore.js';
import type { FindCartById } from '../../../app/port/secondary/persistence/cartRepository.js';
import type { StoreProductEvent } from '../../../app/port/secondary/persistence/productEventStore.js';
import type { FindProductById } from '../../../app/port/secondary/persistence/productRepository.js';
import { MemoryAdaptorInjector } from './memory/injector.js';
import { RdbAdaptorInjector } from './rdb/injector.js';

type PersistencePortInjector = Injector<{
  [StoreProductEvent.token]: StoreProductEvent;
  [FindCartById.token]: FindCartById;
  [StoreCartEvent.token]: StoreCartEvent;
  [FindProductById.token]: FindProductById;
}>;

const PersistencePortInjector = {
  createOnRdb: RdbAdaptorInjector.create,
  createOnMemory: MemoryAdaptorInjector.create,
} as const;

export { PersistencePortInjector };
