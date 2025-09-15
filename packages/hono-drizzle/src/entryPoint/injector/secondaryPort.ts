import type { Injector } from 'typed-inject';

import { CartRepositoryOnMemory } from '../../adapter/secondary/memory/cartRepository.js';
// eslint-disable-next-line max-len
import { UserAccountRepositoryOnMemory } from '../../adapter/secondary/memory/userAccountRepository.js';
import { CartEventStore } from '../../adapter/secondary/rdb/cartEventStore.js';
import { CartRepository } from '../../adapter/secondary/rdb/cartRepository.js';
import { Db } from '../../adapter/secondary/rdb/db.js';
import { PgPool } from '../../adapter/secondary/rdb/pgPool.js';
import { UserAccountRepository } from '../../adapter/secondary/rdb/userAccountRepository.js';
import type { CartEvent } from '../../app/domain/cart/cartEvent.js';
import { StoreCartEvent } from '../../app/port/secondary/cartEventStore.js';
import { FindCartById } from '../../app/port/secondary/cartRepository.js';
import { FindUserAccountById } from '../../app/port/secondary/userAccountRepository.js';

// TODO: 命名
type SecondaryPortInjector = Injector<{
  [FindUserAccountById.token]: FindUserAccountById;
  [FindCartById.token]: FindCartById;
  [StoreCartEvent.token]: StoreCartEvent<CartEvent>;
}>;

const createOnRdb = (rootInjector: Injector): SecondaryPortInjector =>
  rootInjector
    .provideFactory(PgPool.token, PgPool.build)
    .provideFactory(Db.token, Db.build)
    .provideFactory(FindUserAccountById.token, UserAccountRepository.findById)
    .provideFactory(FindCartById.token, CartRepository.findById)
    .provideFactory(StoreCartEvent.token, CartEventStore.store);

const createOnMemory = (rootInjector: Injector): SecondaryPortInjector => {
  const userAccountRepository = UserAccountRepositoryOnMemory.build();
  const cartRepository = CartRepositoryOnMemory.build();
  return rootInjector
    .provideValue(FindUserAccountById.token, userAccountRepository.findById)
    .provideValue(FindCartById.token, cartRepository.findById)
    .provideValue(StoreCartEvent.token, cartRepository.store);
};

const SecondaryPortInjector = {
  createOnRdb,
  createOnMemory,
} as const;

export { SecondaryPortInjector };
