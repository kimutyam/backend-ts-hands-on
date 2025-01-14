import type { ResultAsync } from 'neverthrow';
import { errAsync, okAsync } from 'neverthrow';
import type { Cart } from './cart';
import { CartNotFoundError } from './cartNotFoundError';
import type { ICartRepository } from './cartRepository';
import type { CustomerId } from './customerId';

class InMemoryCartRepository implements ICartRepository {
  private readonly aggregates: Map<CustomerId, Cart> = new Map<CustomerId, Cart>();

  findById(aggregateId: CustomerId): ResultAsync<Cart, CartNotFoundError> {
    const aggregate = this.aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(new CartNotFoundError('カートが空です', aggregateId));
  }

  save(aggregate: Cart): Promise<void> {
    this.aggregates.set(aggregate.aggregateId, aggregate);
    return Promise.resolve();
  }

  deleteById(aggregateId: CustomerId): Promise<void> {
    this.aggregates.delete(aggregateId);
    return Promise.resolve(undefined);
  }
}

export { InMemoryCartRepository };
