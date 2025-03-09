import { Cart } from 'aggregate/10_zod/domain/cart/cart.js';
import type { CustomerId } from 'aggregate/10_zod/domain/customer/customerId.js';
import type { ICartRepository } from 'aggregate/20_repository/domain/cartRepository.js';

export class InMemoryCartRepository
  implements ICartRepository
{
  private readonly aggregates: Record<CustomerId, Cart> =
    {};

  findById(aggregateId: CustomerId): Promise<Cart> {
    const aggregate =
      this.aggregates[aggregateId] ||
      Cart.initBuild(aggregateId);
    return Promise.resolve(aggregate);
  }

  save(aggregate: Cart): Promise<void> {
    this.aggregates[aggregate.aggregateId] = aggregate;
    return Promise.resolve();
  }

  deleteById(aggregateId: CustomerId): Promise<void> {
    delete this.aggregates[aggregateId];
    return Promise.resolve(undefined);
  }
}
