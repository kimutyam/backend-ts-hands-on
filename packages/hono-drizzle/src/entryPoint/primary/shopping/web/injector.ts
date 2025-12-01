import type { Injector } from 'typed-inject';

import { AddCartItemHandler } from '../../../../adapter/primary/shopping/web/cart/addCartItemHandler.js';
import { ClearCartHandler } from '../../../../adapter/primary/shopping/web/cart/clearHandler.js';
import { GetCartHandler } from '../../../../adapter/primary/shopping/web/cart/getHandler.js';
import { RemoveCartItemHandler } from '../../../../adapter/primary/shopping/web/cart/removeCartItemHandler.js';
import type { ValidatedEnv } from '../../validatedEnv.js';
import { ShoppingPortInjector } from '../injector.js';

const createSelf = (injector: ShoppingPortInjector) =>
  injector
    .provideFactory(GetCartHandler.token, GetCartHandler.create)
    .provideFactory(AddCartItemHandler.token, AddCartItemHandler.create)
    .provideFactory(RemoveCartItemHandler.token, RemoveCartItemHandler.create)
    .provideFactory(ClearCartHandler.token, ClearCartHandler.create);

const create = (env: ValidatedEnv): [Injector, WebAdapterInjector] => {
  const [rootInjector, shoppingPortInjector] = ShoppingPortInjector.create(env);
  const webAdapterInjector = createSelf(shoppingPortInjector);
  return [rootInjector, webAdapterInjector];
};

type WebAdapterInjector = ReturnType<typeof createSelf>;
const WebAdapterInjector = {
  create,
} as const;

export { WebAdapterInjector };
