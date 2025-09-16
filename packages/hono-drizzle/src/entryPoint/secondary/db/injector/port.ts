import type { Injector } from 'typed-inject';

import type { CartEvent } from '../../../../app/domain/cart/cartEvent.js';
import type { StoreCartEvent } from '../../../../app/port/secondary/db/cartEventStore.js';
import type { FindCartById } from '../../../../app/port/secondary/db/cartRepository.js';
import type { FindUserAccountById } from '../../../../app/port/secondary/db/userAccountRepository.js';
import { MemoeryAdaptorInjector } from './memoeryAdapter.js';
import { RdbAdaptorInjector } from './rdbAdapter.js';

type DbPortInjector = Injector<{
  [FindUserAccountById.token]: FindUserAccountById;
  [FindCartById.token]: FindCartById;
  [StoreCartEvent.token]: StoreCartEvent<CartEvent>;
}>;

const DbPortInjector = {
  createOnRdb: RdbAdaptorInjector.create,
  createOnMemory: MemoeryAdaptorInjector.create,
} as const;

export { DbPortInjector };
