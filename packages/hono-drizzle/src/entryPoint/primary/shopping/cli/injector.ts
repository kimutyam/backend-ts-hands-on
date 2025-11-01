import type { Injector } from 'typed-inject';

import { AddCartItemHandler } from '../../../../adapter/primary/shopping/cli/addCartItemHandler.js';
import type { AppEnv } from '../../env.js';
import { ShoppingPortInjector } from '../injector.js';

const createSelf = (injector: ShoppingPortInjector) =>
  injector.provideFactory(AddCartItemHandler.token, AddCartItemHandler.create);

const create = (env: AppEnv): [Injector, CliInjector] => {
  const [rootInjector, shoppingPortInjector] = ShoppingPortInjector.create(env);
  const cliInjector = createSelf(shoppingPortInjector);
  return [rootInjector, cliInjector];
};

type CliInjector = ReturnType<typeof createSelf>;
const CliInjector = {
  create,
} as const;

export { CliInjector };
