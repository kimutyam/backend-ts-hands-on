import type { Injector } from 'typed-inject';

import { ProductRepository } from '../../../../adapter/secondary/persistence/memory/productRepository.js';
import { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import type { PersistencePortInjector } from '../injectorForManagement.js';

const create = (rootInjector: Injector): PersistencePortInjector => {
  const productRepository = ProductRepository.create();
  return rootInjector.provideValue(
    StoreProductEvent.token,
    productRepository.store,
  );
};

const MemoryAdaptorInjector = {
  create,
} as const;

export { MemoryAdaptorInjector };
