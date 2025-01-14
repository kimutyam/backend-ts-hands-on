import type { ResultAsync } from 'neverthrow';
import type { Cart } from './cart';
import type { CartNotFoundError } from './cartNotFoundError';
import type { CustomerId } from './customerId';

interface ICartRepository {
  findById(aggregateId: CustomerId): ResultAsync<Cart, CartNotFoundError>;
  save(cart: Cart): Promise<void>;
  deleteById(aggregateId: CustomerId): Promise<void>;
}

export type { ICartRepository };
