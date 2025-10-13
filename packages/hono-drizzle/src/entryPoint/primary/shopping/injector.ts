import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { AddCartItem } from '../../../app/port/primary/shopping/addCartItem.js';
import { buildAddCartItem } from '../../../app/useCase/addCartItem.js';
import { PersistencePortInjector } from '../../secondary/persistence/injector.js';
import type { AppEnv } from '../env.js';

const create = (injector: PersistencePortInjector) =>
  injector.provideFactory(AddCartItem.token, buildAddCartItem);

const build = (env: AppEnv): [Injector, ManagementPortInjector] => {
  const rootInjector = createInjector();
  const persistencePortInjector =
    env.DATABASE_URL === undefined
      ? PersistencePortInjector.createOnMemory(rootInjector)
      : PersistencePortInjector.createOnRdb(rootInjector, env.DATABASE_URL);
  const managementPortInjector = create(persistencePortInjector);
  return [rootInjector, managementPortInjector];
};

type ManagementPortInjector = ReturnType<typeof create>;
const ManagementPortInjector = {
  build,
} as const;

export { ManagementPortInjector };
