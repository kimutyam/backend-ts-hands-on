import type { CustomerId } from '../customer/customerId';
import type { Cart } from './cart';

export interface CartResolver {
  resolveBy(customerId: CustomerId): Promise<Cart>;
}

export interface CartStorer {
  store(cart: Cart): Promise<Cart>;
}
