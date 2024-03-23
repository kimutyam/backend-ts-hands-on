import type { ResultAsync } from 'neverthrow';
import type { CustomerId } from '../customer/customerId';
import type { Cart, CartError } from './cart';

export interface CartResolver {
  resolveBy(customerId: CustomerId): ResultAsync<Cart, CartError>;
}

export interface CartStorer {
  store(cart: Cart): Promise<Cart>;
}
