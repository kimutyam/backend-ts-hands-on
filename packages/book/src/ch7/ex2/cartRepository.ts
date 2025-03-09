import type { Cart } from 'ch7/ex1/cart.js';
import type { CartNotFoundError } from 'ch7/ex1/cartNotFoundError.js';
import type { CustomerId } from 'ch7/ex1/customerId.js';
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
