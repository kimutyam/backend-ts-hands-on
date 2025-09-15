import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { GetUserAccount } from '../../app/port/primary/getUserAccount.js';
import { buildGetUserAccount } from '../../app/useCase/getUserAccount.js';
import { SecondaryPortInjector } from './secondaryPort.js';

const create = (injector: SecondaryPortInjector) =>
  injector.provideFactory(GetUserAccount.token, buildGetUserAccount);

const build = (onMemoryStore = false): [Injector, UseCaseInjector] => {
  const rootInjector = createInjector();
  const secondaryPortInjector = onMemoryStore
    ? SecondaryPortInjector.createOnMemory(rootInjector)
    : SecondaryPortInjector.createOnRdb(rootInjector);
  const useCaseInjector = create(secondaryPortInjector);
  return [rootInjector, useCaseInjector];
};

type UseCaseInjector = ReturnType<typeof create>;
const UseCaseInjector = {
  build,
} as const;

export { UseCaseInjector };
