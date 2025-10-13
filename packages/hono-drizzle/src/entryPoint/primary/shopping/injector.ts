import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { AddCartItem } from '../../../app/port/primary/shopping/addCartItem.js';
import { AddCartItemUseCase } from '../../../app/useCase/addCartItem.js';
import { PersistencePortInjector } from '../../secondary/persistence/injector.js';
import type { AppEnv } from '../env.js';

const createSelf = (injector: PersistencePortInjector) =>
  injector.provideFactory(AddCartItem.token, AddCartItemUseCase.create);

const create = (env: AppEnv): [Injector, ManagementPortInjector] => {
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
