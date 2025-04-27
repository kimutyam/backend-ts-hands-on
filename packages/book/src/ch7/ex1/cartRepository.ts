import type { Cart } from 'ch7/ex1/cart.js';
import type { CartNotFoundError } from 'ch7/ex1/cartNotFoundError.js';
import type { CustomerId } from 'ch7/ex1/customerId.js';
import type { ResultAsync } from 'neverthrow';

interface CartRepository {
  findById: (aggregateId: CustomerId) => ResultAsync<Cart, CartNotFoundError>;
  save: (cart: Cart) => Promise<void>;
  deleteById: (aggregateId: CustomerId) => Promise<void>;
}

export type { CartRepository };
