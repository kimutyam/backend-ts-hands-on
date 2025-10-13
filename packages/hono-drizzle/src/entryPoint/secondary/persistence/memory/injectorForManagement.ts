import type { Injector } from 'typed-inject';

import { ProductRepository } from '../../../../adapter/secondary/persistence/memory/productRepository.js';
import { UserAccountRepository } from '../../../../adapter/secondary/persistence/memory/userAccountRepository.js';
import { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import { FindUserAccountById } from '../../../../app/port/secondary/persistence/userAccountRepository.js';
import type { PersistencePortInjector } from '../injectorForManagement.js';

const create = (rootInjector: Injector): PersistencePortInjector => {
  const userAccountRepository = UserAccountRepository.create();
  const productRepository = ProductRepository.create();
  return rootInjector
    .provideValue(FindUserAccountById.token, userAccountRepository.findById)
    .provideValue(StoreProductEvent.token, productRepository.store);
};

const MemoryAdaptorInjector = {
  create,
} as const;

export { MemoryAdaptorInjector };
