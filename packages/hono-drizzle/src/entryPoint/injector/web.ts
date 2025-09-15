import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { UserAccountHandler } from '../../adapter/primary/web/userAccountHandler.js';
import { RdbInjector } from './rdb.js';
import { UseCaseInjector } from './useCase.js';

const create = (useCaseInjector: UseCaseInjector) =>
  useCaseInjector.provideFactory(
    UserAccountHandler.token,
    UserAccountHandler.build,
  );

const build = (): [Injector, WebInjector] => {
  const rootInjector = createInjector();
  const rdbInjector = RdbInjector.create(rootInjector);
  const useCaseInjector = UseCaseInjector.create(rdbInjector);
  const webInjector = create(useCaseInjector);
  return [rootInjector, webInjector];
};

type WebInjector = ReturnType<typeof create>;
const WebInjector = {
  build,
} as const;

export { WebInjector };
