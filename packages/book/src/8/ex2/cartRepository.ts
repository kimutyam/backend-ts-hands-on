import type { ResultAsync } from 'neverthrow';

import type { Cart } from '../ex1/cart.js';
import type { CartNotFoundError } from '../ex1/cartNotFoundError.js';
import type { CustomerId } from '../ex1/customerId.js';

interface FindCartById {
  (aggregateId: CustomerId): ResultAsync<Cart, CartNotFoundError>;
}

interface StoreCart {
  (aggregate: Cart): Promise<void>;
}

interface DeleteCartById {
  (aggregateId: CustomerId): Promise<void>;
}

export type { DeleteCartById, FindCartById, StoreCart };
