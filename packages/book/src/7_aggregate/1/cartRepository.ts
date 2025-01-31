import type { ResultAsync } from 'neverthrow';
import type { Cart } from './cart.js';
import type { CartNotFoundError } from './cartNotFoundError.js';
import type { CustomerId } from './customerId.js';

interface ICartRepository {
  findById: (aggregateId: CustomerId) => ResultAsync<Cart, CartNotFoundError>;
  save: (cart: Cart) => Promise<void>;
  deleteById: (aggregateId: CustomerId) => Promise<void>;
}

export type { ICartRepository };
