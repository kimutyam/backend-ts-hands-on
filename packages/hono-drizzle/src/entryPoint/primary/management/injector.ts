import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { RegisterProduct } from '../../../app/port/primary/management/registerProduct.js';
import { RegisterProductUseCase } from '../../../app/useCase/registerProduct.js';
import type { PersistencePortInjector } from '../../secondary/persistence/injector.js';
import { MemoryAdapterInjector } from '../../secondary/persistence/memory/injector.js';
import { RdbAdapterInjector } from '../../secondary/persistence/rdb/injector.js';
import type { ValidatedEnv } from '../validatedEnv.js';

// 1
const createSelf = (injector: PersistencePortInjector) =>
  injector.provideFactory(RegisterProduct.token, RegisterProductUseCase.create);

// 2
const create = (env: ValidatedEnv): [Injector, ManagementPortInjector] => {
  const rootInjector = createInjector();
  const persistencePortInjector =
    env.DATABASE_URL === undefined
      ? MemoryAdapterInjector.create(rootInjector)
      : RdbAdapterInjector.create(rootInjector, env.DATABASE_URL);
  const managementPortInjector = createSelf(persistencePortInjector);
  return [rootInjector, managementPortInjector];
};

// 3
type ManagementPortInjector = ReturnType<typeof createSelf>;
const ManagementPortInjector = {
  create,
} as const;

export { ManagementPortInjector };
