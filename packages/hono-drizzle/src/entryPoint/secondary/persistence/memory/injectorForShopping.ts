import type { Injector } from 'typed-inject';

import { CartRepositoryOnMemory } from '../../../../adapter/secondary/persistence/memory/cartRepository.js';
import { ProductRepositoryOnMemory } from '../../../../adapter/secondary/persistence/memory/productRepository.js';
import { StoreCartEvent } from '../../../../app/port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '../../../../app/port/secondary/persistence/cartRepository.js';
import { FindProductById } from '../../../../app/port/secondary/persistence/productRepository.js';
import type { PersistencePortInjector } from '../injectorForShopping.js';

const create = (rootInjector: Injector): PersistencePortInjector => {
  const cartRepository = CartRepositoryOnMemory.create();
  const productRepository = ProductRepositoryOnMemory.create();
  return rootInjector
    .provideValue(FindCartById.token, cartRepository.findById)
    .provideValue(StoreCartEvent.token, cartRepository.store)
    .provideValue(FindProductById.token, productRepository.findById);
};

const MemoryAdaptorInjector = {
  create,
} as const;

export { MemoryAdaptorInjector };
