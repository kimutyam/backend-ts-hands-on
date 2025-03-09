import type { Cart } from '7_aggregate/1/cart.js';
import type { CartNotFoundError } from '7_aggregate/1/cartNotFoundError.js';
import type { CustomerId } from '7_aggregate/1/customerId.js';
import type { ResultAsync } from 'neverthrow';

interface ICartRepository {
  findById: (
    aggregateId: CustomerId,
  ) => ResultAsync<Cart, CartNotFoundError>;
  save: (cart: Cart) => Promise<void>;
  deleteById: (aggregateId: CustomerId) => Promise<void>;
}

export type { ICartRepository };
