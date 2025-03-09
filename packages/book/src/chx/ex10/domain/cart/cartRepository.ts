import type { Cart } from 'chx/ex10/domain/cart/cart.js';
import type { CustomerId } from 'chx/ex10/domain/customer/customerId.js';

export interface CartResolver {
  resolveById: (aggregateId: CustomerId) => Promise<Cart>;
}

export interface CartStorer {
  store: (cart: Cart) => Promise<Cart>;
}
