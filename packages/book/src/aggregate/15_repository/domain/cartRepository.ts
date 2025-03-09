import type { Cart } from 'aggregate/10_zod/domain/cart/cart.js';
import type { CustomerId } from 'aggregate/10_zod/domain/customer/customerId.js';

export interface ICartRepository {
  findById: (aggregateId: CustomerId) => Promise<Cart>;
  save: (aggregate: Cart) => Promise<void>;
  deleteById: (aggregateId: CustomerId) => Promise<void>;
}
