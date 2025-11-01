import type { Injector } from 'typed-inject';
import { createInjector } from 'typed-inject';

import { AddCartItem } from '../../../app/port/primary/shopping/addCartItem.js';
import { AddCartItemUseCase } from '../../../app/useCase/addCartItem.js';
import { PersistencePortInjector } from '../../secondary/persistence/injectorForShopping.js';
import type { AppEnv } from '../env.js';

const createSelf = (injector: PersistencePortInjector) =>
  injector.provideFactory(AddCartItem.token, AddCartItemUseCase.create);

const create = (env: AppEnv): [Injector, ShoppingPortInjector] => {
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
