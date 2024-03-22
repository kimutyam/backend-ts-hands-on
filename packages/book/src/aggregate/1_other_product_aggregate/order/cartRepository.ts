import type { ResultAsync } from 'neverthrow';
import type { CustomerId } from '../customer/customerId';
import type { Cart } from './cart';
import type { TotalPriceLimitError } from './totalPriceLimitError';

export interface CartResolver {
  resolveBy(customerId: CustomerId): ResultAsync<Cart, TotalPriceLimitError>;
}

export interface CartStore {
  store(cart: Cart): Promise<void>;
}
