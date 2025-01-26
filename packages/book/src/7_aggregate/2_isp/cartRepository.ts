import type { ResultAsync } from 'neverthrow';
import type { Cart } from '../1/cart.js';
import type { CartNotFoundError } from '../1/cartNotFoundError.js';
import type { CustomerId } from '../1/customerId.js';

interface FindCartById {
  (aggregateId: CustomerId): ResultAsync<Cart, CartNotFoundError>;
}

interface SaveCart {
  (aggregate: Cart): Promise<void>;
}

interface DeleteCartById {
  (aggregateId: CustomerId): Promise<void>;
}

export type { FindCartById, SaveCart, DeleteCartById };
