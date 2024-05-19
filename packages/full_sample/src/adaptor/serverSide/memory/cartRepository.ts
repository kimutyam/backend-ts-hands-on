import type { Cart } from '../../../domain/cart';
import type { ICartRepository } from '../../../domain/cartRepository';
import type { CustomerId } from '../../../domain/customerId';

export class CartRepository implements ICartRepository {
  private readonly aggregates: Record<CustomerId, Cart> = {};

  findById(id: CustomerId): Promise<Cart | undefined> {
    return Promise.resolve(this.aggregates[id]);
  }

  save(cart: Cart): Promise<void> {
    this.aggregates[cart.customerId] = cart;
    return Promise.resolve();
  }
}
