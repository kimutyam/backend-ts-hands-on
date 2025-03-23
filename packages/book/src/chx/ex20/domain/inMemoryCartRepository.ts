import { Cart } from 'chx/ex10/domain/cart/cart.js';
import type { CustomerId } from 'chx/ex10/domain/customer/customerId.js';
import type { ICartRepository } from 'chx/ex20/domain/cartRepository.js';

export class InMemoryCartRepository implements ICartRepository {
  private readonly aggregates: Record<CustomerId, Cart> = {};

  findById(aggregateId: CustomerId): Promise<Cart> {
    const aggregate =
      this.aggregates[aggregateId] || Cart.initBuild(aggregateId);
    return Promise.resolve(aggregate);
  }

  save(aggregate: Cart): Promise<void> {
    this.aggregates[aggregate.aggregateId] = aggregate;
    return Promise.resolve();
  }

  deleteById(aggregateId: CustomerId): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.aggregates[aggregateId];
    return Promise.resolve(undefined);
  }
}
