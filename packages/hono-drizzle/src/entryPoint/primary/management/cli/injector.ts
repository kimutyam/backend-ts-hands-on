import type { Injector } from 'typed-inject';

import { GetUserAccountHandler } from '../../../../adapter/primary/management/cli/getUserAccountHandler.js';
import { RegisterProductHandler } from '../../../../adapter/primary/management/cli/registerProductHandler.js';
import type { AppEnv } from '../../env.js';
import { ManagementPortInjector } from '../injector.js';

const createSelf = (injector: ManagementPortInjector) =>
  injector
    .provideFactory(GetUserAccountHandler.token, GetUserAccountHandler.create)
    .provideFactory(
      RegisterProductHandler.token,
      RegisterProductHandler.create,
    );

const create = (env: AppEnv): [Injector, CliInjector] => {
  const [rootInjector, managementPortInjector] =
    ManagementPortInjector.create(env);
  const webAdaptorInjector = createSelf(managementPortInjector);
  return [rootInjector, webAdaptorInjector];
};

type CliInjector = ReturnType<typeof createSelf>;
const CliInjector = {
  create,
} as const;

export { CliInjector };
