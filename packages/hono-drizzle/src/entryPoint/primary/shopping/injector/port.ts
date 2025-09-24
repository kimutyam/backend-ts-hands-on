import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { AddCartItem } from '../../../../app/port/primary/shopping/addCartItem.js';
import { buildAddCartItem } from '../../../../app/useCase/addCartItem.js';
import { DbPortInjector } from '../../../secondary/db/injector/port.js';
import type { AppEnv } from '../../helper/env.js';

const create = (injector: DbPortInjector) =>
  injector.provideFactory(AddCartItem.token, buildAddCartItem);

const build = (env: AppEnv): [Injector, ManagementPortInjector] => {
  const rootInjector = createInjector();
  const dbPortInjector =
    env.DATABASE_URL === undefined
      ? DbPortInjector.createOnMemory(rootInjector)
      : DbPortInjector.createOnRdb(rootInjector, env.DATABASE_URL);
  const useCaseInjector = create(dbPortInjector);
  return [rootInjector, useCaseInjector];
};

type ManagementPortInjector = ReturnType<typeof create>;
const ManagementPortInjector = {
  build,
} as const;

export { ManagementPortInjector };
