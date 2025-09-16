import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { GetUserAccount } from '../../../../app/port/primary/management/getUserAccount.js';
import { buildGetUserAccount } from '../../../../app/useCase/getUserAccount.js';
import { DbPortInjector } from '../../../secondary/db/injector/port.js';

const create = (injector: DbPortInjector) =>
  injector.provideFactory(GetUserAccount.token, buildGetUserAccount);

const build = (onMemoryStore = false): [Injector, ManagementPortInjector] => {
  const rootInjector = createInjector();
  const dbPortInjector = onMemoryStore
    ? DbPortInjector.createOnMemory(rootInjector)
    : DbPortInjector.createOnRdb(rootInjector);
  const useCaseInjector = create(dbPortInjector);
  return [rootInjector, useCaseInjector];
};

type ManagementPortInjector = ReturnType<typeof create>;
const ManagementPortInjector = {
  build,
} as const;

export { ManagementPortInjector };
