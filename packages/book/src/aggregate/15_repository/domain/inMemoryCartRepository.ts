import { Cart } from '../../10_zod/domain/cart/cart';
import type { CustomerId } from '../../10_zod/domain/customer/customerId';
import type { ICartRepository } from './cartRepository';

export class InMemoryCartRepository implements ICartRepository {
  private readonly aggregates: Record<CustomerId, Cart> = {};

  findById(aggregateId: CustomerId): Promise<Cart> {
    const aggregate = this.aggregates[aggregateId] || Cart.init(aggregateId);
    return Promise.resolve(aggregate);
  }

  save(aggregate: Cart): Promise<void> {
    this.aggregates[aggregate.customerId] = aggregate;
    return Promise.resolve();
  }

  deleteById(aggregateId: CustomerId): Promise<void> {
    delete this.aggregates[aggregateId];
    return Promise.resolve(undefined);
  }
}
