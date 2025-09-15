import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { RdbInjector } from './rdb.js';
import { UseCaseInjector } from './useCase.js';

const buildInjector = (): [Injector, UseCaseInjector] => {
  const rootInjector = createInjector();
  const rdbInjector = RdbInjector.create(rootInjector);
  const useCaseInjector = UseCaseInjector.create(rdbInjector);
  return [rootInjector, useCaseInjector];
};

export { buildInjector };
