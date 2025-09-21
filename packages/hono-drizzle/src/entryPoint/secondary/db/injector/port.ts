import type { Injector } from 'typed-inject';

import type { StoreCartEvent } from '../../../../app/port/secondary/db/cartEventStore.js';
import type { FindCartById } from '../../../../app/port/secondary/db/cartRepository.js';
import type { StoreProductEvent } from '../../../../app/port/secondary/db/productEventStore.js';
import type { FindProductById } from '../../../../app/port/secondary/db/productRepository.js';
import type { FindUserAccountById } from '../../../../app/port/secondary/db/userAccountRepository.js';
import { MemoryAdaptorInjector } from './memoeryAdapter.js';
import { RdbAdaptorInjector } from './rdbAdapter.js';

type DbPortInjector = Injector<{
  [FindUserAccountById.token]: FindUserAccountById;
  [FindCartById.token]: FindCartById;
  [StoreCartEvent.token]: StoreCartEvent;
  [FindProductById.token]: FindProductById;
  [StoreProductEvent.token]: StoreProductEvent;
}>;

const DbPortInjector = {
  createOnRdb: RdbAdaptorInjector.create,
  createOnMemory: MemoryAdaptorInjector.create,
} as const;

export { DbPortInjector };
