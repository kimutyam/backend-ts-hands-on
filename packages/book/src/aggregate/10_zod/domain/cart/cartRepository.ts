import type { CustomerId } from '../customer/customerId.js';
import type { Cart } from './cart.js';

export interface CartResolver {
  resolveById: (aggregateId: CustomerId) => Promise<Cart>;
}

export interface CartStorer {
  store: (cart: Cart) => Promise<Cart>;
}
