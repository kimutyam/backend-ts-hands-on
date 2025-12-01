import type { Injector } from 'typed-inject';

import { RegisterProductHandler } from '../../../../adapter/primary/management/cli/registerProductHandler.js';
import type { ValidatedEnv } from '../../validatedEnv.js';
import { ManagementPortInjector } from '../injector.js';

const createSelf = (injector: ManagementPortInjector) =>
  injector.provideFactory(
    RegisterProductHandler.token,
    RegisterProductHandler.create,
  );

const create = (env: ValidatedEnv): [Injector, CliAdapterInjector] => {
  const [rootInjector, managementPortInjector] =
    ManagementPortInjector.create(env);
  const cliAdapterInjector = createSelf(managementPortInjector);
  return [rootInjector, cliAdapterInjector];
};

type CliAdapterInjector = ReturnType<typeof createSelf>;
const CliAdapterInjector = {
  create,
} as const;

export { CliAdapterInjector };
