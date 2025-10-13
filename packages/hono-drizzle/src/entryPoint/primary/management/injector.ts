import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { GetUserAccount } from '../../../app/port/primary/management/getUserAccount.js';
import { RegisterProduct } from '../../../app/port/primary/management/registerProduct.js';
import { GetUserAccountUseCase } from '../../../app/useCase/getUserAccount.js';
import { RegisterProductUseCase } from '../../../app/useCase/registerProduct.js';
import { PersistencePortInjector } from '../../secondary/persistence/injector.js';
import type { AppEnv } from '../env.js';

const create = (injector: PersistencePortInjector) =>
  injector
    .provideFactory(GetUserAccount.token, GetUserAccountUseCase.build)
    .provideFactory(RegisterProduct.token, RegisterProductUseCase.build);

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
