import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { RegisterProduct } from '../../../app/port/primary/management/registerProduct.js';
import { RegisterProductUseCase } from '../../../app/useCase/registerProduct.js';
import { PersistencePortInjector } from '../../secondary/persistence/injector.js';
import type { ValidatedEnv } from '../validatedEnv.js';

const createSelf = (injector: PersistencePortInjector) =>
  injector.provideFactory(RegisterProduct.token, RegisterProductUseCase.create);

const create = (env: ValidatedEnv): [Injector, ManagementPortInjector] => {
  const rootInjector = createInjector();
  const persistencePortInjector =
    env.DATABASE_URL === undefined
      ? PersistencePortInjector.createOnMemory(rootInjector)
      : PersistencePortInjector.createOnRdb(rootInjector, env.DATABASE_URL);
  const managementPortInjector = createSelf(persistencePortInjector);
  return [rootInjector, managementPortInjector];
};

type ManagementPortInjector = ReturnType<typeof createSelf>;
const ManagementPortInjector = {
  create,
} as const;

export { ManagementPortInjector };
