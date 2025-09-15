import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { SecondaryPortInjector } from './secondaryPort.js';
import { UseCaseInjector } from './useCase.js';

const buildInjector = (): [Injector, UseCaseInjector] => {
  const rootInjector = createInjector();
  const secondaryPortInjector = SecondaryPortInjector.createOnRdb(rootInjector);
  const useCaseInjector = UseCaseInjector.create(secondaryPortInjector);
  return [rootInjector, useCaseInjector];
};

export { buildInjector };
