import type { Injector } from 'typed-inject';

import { UserAccountHandler } from '../../adapter/primary/web/userAccountHandler.js';
import { UseCaseInjector } from './useCase.js';

const create = (useCaseInjector: UseCaseInjector) =>
  useCaseInjector.provideFactory(
    UserAccountHandler.token,
    UserAccountHandler.build,
  );

const build = (onMemoryStore = false): [Injector, WebInjector] => {
  const [rootInjector, useCaseInjector] = UseCaseInjector.build(onMemoryStore);
  const webInjector = create(useCaseInjector);
  return [rootInjector, webInjector];
};

type WebInjector = ReturnType<typeof create>;
const WebInjector = {
  build,
} as const;

export { WebInjector };
