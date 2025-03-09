import type { Cart } from '7_aggregate/1/cart.js';
import type { CartNotFoundError } from '7_aggregate/1/cartNotFoundError.js';
import type { CustomerId } from '7_aggregate/1/customerId.js';
import type { ResultAsync } from 'neverthrow';

interface FindCartById {
  (
    aggregateId: CustomerId,
  ): ResultAsync<Cart, CartNotFoundError>;
}

interface SaveCart {
  (aggregate: Cart): Promise<void>;
}

interface DeleteCartById {
  (aggregateId: CustomerId): Promise<void>;
}

export type { FindCartById, SaveCart, DeleteCartById };
