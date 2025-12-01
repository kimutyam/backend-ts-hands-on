import type { Injector } from 'typed-inject';

import { CartRepositoryOnMemory } from '../../../../adapter/secondary/persistence/memory/cartRepository.js';
import { ProductRepositoryOnMemory } from '../../../../adapter/secondary/persistence/memory/productRepository.js';
import { StoreCartEvent } from '../../../../app/port/secondary/persistence/cartEventStore.js';
import { FindCartById } from '../../../../app/port/secondary/persistence/cartRepository.js';
import { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import { FindProductById } from '../../../../app/port/secondary/persistence/productRepository.js';
import type { PersistencePortInjector } from '../injector.js';

const create = (rootInjector: Injector): PersistencePortInjector => {
  const productRepository = ProductRepositoryOnMemory.create();
  const cartRepository = CartRepositoryOnMemory.create();
  return rootInjector
    .provideValue(FindProductById.token, productRepository.findById)
    .provideValue(StoreProductEvent.token, productRepository.store)
    .provideValue(FindCartById.token, cartRepository.findById)
    .provideValue(StoreCartEvent.token, cartRepository.store);
};

const MemoryAdapterInjector = {
  create,
} as const;

export { MemoryAdapterInjector };
