import type { Injector } from 'typed-inject';

import { DeleteCartHandler } from '../../../../adapter/primary/shopping/web/cart/deleteHandler.js';
import { GetCartHandler } from '../../../../adapter/primary/shopping/web/cart/getHandler.js';
import type { AppEnv } from '../../env.js';
import { ShoppingPortInjector } from '../injector.js';

const createSelf = (injector: ShoppingPortInjector) =>
  injector
    .provideFactory(GetCartHandler.token, GetCartHandler.create)
    .provideFactory(DeleteCartHandler.token, DeleteCartHandler.create);

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
