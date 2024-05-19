import type { Cart } from './cart';
import type { CustomerId } from './customerId';

export interface ICartRepository {
  findById(id: CustomerId): Promise<Cart | undefined>;

  save(cart: Cart): Promise<void>;
}

export const ICartRepository = {
  token: 'ICartRepository' as const,
} as const;
