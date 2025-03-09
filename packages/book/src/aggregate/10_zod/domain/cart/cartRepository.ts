import type { Cart } from 'aggregate/10_zod/domain/cart/cart.js';
import type { CustomerId } from 'aggregate/10_zod/domain/customer/customerId.js';

export interface CartResolver {
  resolveById: (aggregateId: CustomerId) => Promise<Cart>;
}

export interface CartStorer {
  store: (cart: Cart) => Promise<Cart>;
}
