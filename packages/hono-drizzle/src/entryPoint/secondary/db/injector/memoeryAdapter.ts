import type { Injector } from 'typed-inject';

import { CartRepositoryOnMemory } from '../../../../adapter/secondary/db/memory/cartRepository.js';
import { ProductRepositoryOnMemory } from '../../../../adapter/secondary/db/memory/productRepository.js';
import { UserAccountRepositoryOnMemory } from '../../../../adapter/secondary/db/memory/userAccountRepository.js';
import { StoreCartEvent } from '../../../../app/port/secondary/db/cartEventStore.js';
import { FindCartById } from '../../../../app/port/secondary/db/cartRepository.js';
import { StoreProductEvent } from '../../../../app/port/secondary/db/productEventStore.js';
import { FindProductById } from '../../../../app/port/secondary/db/productRepository.js';
import { FindUserAccountById } from '../../../../app/port/secondary/db/userAccountRepository.js';
import type { DbPortInjector } from './port.js';

const create = (rootInjector: Injector): DbPortInjector => {
  const userAccountRepository = UserAccountRepositoryOnMemory.build();
  const cartRepository = CartRepositoryOnMemory.build();
  const productRepository = ProductRepositoryOnMemory.build();
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
