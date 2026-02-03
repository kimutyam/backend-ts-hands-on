import type { ResultAsync } from 'neverthrow';

import type { Cart } from './cart.js';
import type { CartNotFoundError } from './cartNotFoundError.js';
import type { CustomerId } from './customerId.js';

interface CartRepository {
  findById: (aggregateId: CustomerId) => ResultAsync<Cart, CartNotFoundError>;
  store: (cart: Cart) => ResultAsync<void, never>;
  deleteById: (aggregateId: CustomerId) => ResultAsync<void, never>;
}

export type { CartRepository };
