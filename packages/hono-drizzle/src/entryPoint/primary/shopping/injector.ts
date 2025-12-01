import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { AddCartItem } from '../../../app/port/primary/shopping/addCartItem.js';
import { ClearCart } from '../../../app/port/primary/shopping/clearCart.js';
import { GetCart } from '../../../app/port/primary/shopping/getCart.js';
import { RemoveCartItem } from '../../../app/port/primary/shopping/removeCartItem.js';
import { AddCartItemUseCase } from '../../../app/useCase/addCartItem.js';
import { ClearCartUseCase } from '../../../app/useCase/clearCart.js';
import { GetCartUseCase } from '../../../app/useCase/getCart.js';
import { RemoveCartItemUseCase } from '../../../app/useCase/removeCartItem.js';
import { PersistencePortInjector } from '../../secondary/persistence/injector.js';
import type { ValidatedEnv } from '../validatedEnv.js';

const createSelf = (injector: PersistencePortInjector) =>
  injector
    .provideFactory(GetCart.token, GetCartUseCase.create)
    .provideFactory(AddCartItem.token, AddCartItemUseCase.create)
    .provideFactory(RemoveCartItem.token, RemoveCartItemUseCase.create)
    .provideFactory(ClearCart.token, ClearCartUseCase.create);

const create = (env: ValidatedEnv): [Injector, ShoppingPortInjector] => {
  const rootInjector = createInjector();
  const persistencePortInjector =
    env.DATABASE_URL === undefined
      ? PersistencePortInjector.createOnMemory(rootInjector)
      : PersistencePortInjector.createOnRdb(rootInjector, env.DATABASE_URL);
  const shoppingPortInjector = createSelf(persistencePortInjector);
  return [rootInjector, shoppingPortInjector];
};

type ShoppingPortInjector = ReturnType<typeof createSelf>;
const ShoppingPortInjector = {
  create,
} as const;

export { ShoppingPortInjector };
