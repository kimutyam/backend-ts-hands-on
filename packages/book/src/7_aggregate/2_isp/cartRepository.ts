import type { ResultAsync } from 'neverthrow';
import type { Cart } from '../1/cart';
import type { CartNotFoundError } from '../1/cartNotFoundError';
import type { CustomerId } from '../1/customerId';

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
