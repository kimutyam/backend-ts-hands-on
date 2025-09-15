import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { SecondaryPortInjector } from './secondaryPort.js';
import { UseCaseInjector } from './useCase.js';
import { WebInjector } from './webAdapter.js';

const buildInjector = (): [Injector, WebInjector] => {
  const rootInjector = createInjector();
  const secondaryPortInjector = SecondaryPortInjector.createOnRdb(rootInjector);
  const useCaseInjector = UseCaseInjector.create(secondaryPortInjector);
  const webInjector = WebInjector.create(useCaseInjector);
  return [rootInjector, webInjector];
};

export { buildInjector };
