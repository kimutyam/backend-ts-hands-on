import type { Cart } from '7_aggregate/1/cart.js';
import { CartNotFoundError } from '7_aggregate/1/cartNotFoundError.js';
import type { ICartRepository } from '7_aggregate/1/cartRepository.js';
import type { CustomerId } from '7_aggregate/1/customerId.js';
import { errAsync, okAsync } from 'neverthrow';
import type { ResultAsync } from 'neverthrow';

class InMemoryCartRepository implements ICartRepository {
  private readonly aggregates: Map<CustomerId, Cart> =
    new Map<CustomerId, Cart>();

  findById(
    aggregateId: CustomerId,
  ): ResultAsync<Cart, CartNotFoundError> {
    const aggregate = this.aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(new CartNotFoundError(aggregateId));
  }

  save(aggregate: Cart): Promise<void> {
    this.aggregates.set(aggregate.aggregateId, aggregate);
    return Promise.resolve();
  }

  deleteById(aggregateId: CustomerId): Promise<void> {
    this.aggregates.delete(aggregateId);
    return Promise.resolve();
  }
}

export { InMemoryCartRepository };
