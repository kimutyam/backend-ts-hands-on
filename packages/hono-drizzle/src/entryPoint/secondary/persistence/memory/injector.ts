import type { Injector } from 'typed-inject';

import { CartRepository } from '../../../../adapter/secondary/persistence/memory/cartRepository.js';
import { ProductRepository } from '../../../../adapter/secondary/persistence/memory/productRepository.js';
import { UserAccountRepository } from '../../../../adapter/secondary/persistence/memory/userAccountRepository.js';
import { StoreCartEvent } from '../../../../app/port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '../../../../app/port/secondary/persistence/cartRepository.js';
import { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import { FindProductById } from '../../../../app/port/secondary/persistence/productRepository.js';
import { FindUserAccountById } from '../../../../app/port/secondary/persistence/userAccountRepository.js';
import type { PersistencePortInjector } from '../injector.js';

const create = (rootInjector: Injector): PersistencePortInjector => {
  const userAccountRepository = UserAccountRepository.build();
  const cartRepository = CartRepository.build();
  const productRepository = ProductRepository.build();
  return rootInjector
    .provideValue(FindUserAccountById.token, userAccountRepository.findById)
    .provideValue(FindCartById.token, cartRepository.findById)
    .provideValue(StoreCartEvent.token, cartRepository.store)
    .provideValue(FindProductById.token, productRepository.findById)
    .provideValue(StoreProductEvent.token, productRepository.store);
};

const MemoryAdaptorInjector = {
  create,
} as const;

export { MemoryAdaptorInjector };
