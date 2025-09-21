import type { Injector } from 'typed-inject';

import { RegisterProductHandler } from '../../../../adapter/primary/management/cli/registerProductHandler.js';
import { UserAccountHandler } from '../../../../adapter/primary/management/web/userAccountHandler.js';
import { ManagementPortInjector } from './port.js';

const create = (injector: ManagementPortInjector) =>
  injector
    .provideFactory(UserAccountHandler.token, UserAccountHandler.build)
    .provideFactory(RegisterProductHandler.token, RegisterProductHandler.build);

const build = (onMemoryStore = false): [Injector, WebInjector] => {
  const [rootInjector, managementPortInjector] =
    ManagementPortInjector.build(onMemoryStore);
  const webAdaptorInjector = create(managementPortInjector);
  return [rootInjector, webAdaptorInjector];
};

type WebInjector = ReturnType<typeof create>;
const WebInjector = {
  build,
} as const;

export { WebInjector };
