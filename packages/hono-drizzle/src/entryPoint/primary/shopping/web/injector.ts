import type { Injector } from 'typed-inject';

import { ClearCartHandler } from '../../../../adapter/primary/shopping/web/cart/clearHandler.js';
import { GetCartHandler } from '../../../../adapter/primary/shopping/web/cart/getHandler.js';
import type { AppEnv } from '../../env.js';
import { ShoppingPortInjector } from '../injector.js';

const createSelf = (injector: ShoppingPortInjector) =>
  injector
    .provideFactory(GetCartHandler.token, GetCartHandler.create)
    .provideFactory(ClearCartHandler.token, ClearCartHandler.create);

const create = (env: AppEnv): [Injector, WebInjector] => {
  const [rootInjector, shoppingPortInjector] = ShoppingPortInjector.create(env);
  const webAdaptorInjector = createSelf(shoppingPortInjector);
  return [rootInjector, webAdaptorInjector];
};

type WebInjector = ReturnType<typeof createSelf>;
const WebInjector = {
  create,
} as const;

export { WebInjector };
