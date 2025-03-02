import type { ResultAsync } from 'neverthrow';
import { errAsync, okAsync } from 'neverthrow';
import type { Cart } from './cart.js';
import { CartNotFoundError } from './cartNotFoundError.js';
import type { ICartRepository } from './cartRepository.js';
import type { CustomerId } from './customerId.js';

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
