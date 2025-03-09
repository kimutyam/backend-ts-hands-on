import type { Cart } from 'chx/ex10/domain/cart/cart.js';
import type { CustomerId } from 'chx/ex10/domain/customer/customerId.js';

export interface ICartRepository {
  findById: (aggregateId: CustomerId) => Promise<Cart>;
  save: (aggregate: Cart) => Promise<void>;
  deleteById: (aggregateId: CustomerId) => Promise<void>;
}
