import type { ResultAsync } from 'neverthrow';
import type * as z from 'zod';
import type { CustomerId } from '../customer/customerId';
import type { Cart, CartInput } from './cart';

export interface CartResolver {
  resolveBy(customerId: CustomerId): ResultAsync<Cart, z.ZodError<CartInput>>;
}

export interface CartStorer {
  store(cart: Cart): Promise<Cart>;
}
