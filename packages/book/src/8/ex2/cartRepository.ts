import type { ResultAsync } from 'neverthrow';

import type { Cart } from '../ex1/cart.js';
import type { CartNotFoundError } from '../ex1/cartNotFoundError.js';
import type { CustomerId } from '../ex1/customerId.js';

interface FindCartById {
  (aggregateId: CustomerId): ResultAsync<Cart, CartNotFoundError>;
}

interface StoreCart {
  (aggregate: Cart): ResultAsync<void, never>;
}

interface DeleteCartById {
  (aggregateId: CustomerId): ResultAsync<void, never>;
}

export type { DeleteCartById, FindCartById, StoreCart };
