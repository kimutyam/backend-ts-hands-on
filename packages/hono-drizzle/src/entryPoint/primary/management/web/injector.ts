import type { Injector } from 'typed-inject';

import { UserAccountHandler } from '../../../../adapter/primary/management/web/userAccountHandler.js';
import type { AppEnv } from '../../env.js';
import { ManagementPortInjector } from '../injector.js';

const createSelf = (injector: ManagementPortInjector) =>
  injector.provideFactory(UserAccountHandler.token, UserAccountHandler.create);

const create = (env: AppEnv): [Injector, WebInjector] => {
  const [rootInjector, managementPortInjector] =
    ManagementPortInjector.create(env);
  const webAdaptorInjector = createSelf(managementPortInjector);
  return [rootInjector, webAdaptorInjector];
};

type WebInjector = ReturnType<typeof createSelf>;
const WebInjector = {
  create,
} as const;

export { WebInjector };
