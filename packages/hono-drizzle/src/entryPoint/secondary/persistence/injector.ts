import type { Injector } from 'typed-inject';

import type { StoreCartEvent } from '../../../app/port/secondary/persistence/cartEventStore.js';
import type { FindCartById } from '../../../app/port/secondary/persistence/cartRepository.js';
import type { StoreProductEvent } from '../../../app/port/secondary/persistence/productEventStore.js';
import type { FindProductById } from '../../../app/port/secondary/persistence/productRepository.js';
import { MemoryAdapterInjector } from './memory/injector.js';
import { RdbAdapterInjector } from './rdb/injector.js';

type PersistencePortInjector = Injector<{
  [FindProductById.token]: FindProductById;
  [StoreProductEvent.token]: StoreProductEvent;
  [FindCartById.token]: FindCartById;
  [StoreCartEvent.token]: StoreCartEvent;
}>;

const PersistencePortInjector = {
  createOnRdb: RdbAdapterInjector.create,
  createOnMemory: MemoryAdapterInjector.create,
} as const;

export { PersistencePortInjector };
