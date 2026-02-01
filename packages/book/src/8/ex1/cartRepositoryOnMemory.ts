import type { ResultAsync } from 'neverthrow';
import { errAsync, okAsync } from 'neverthrow';

import type { Cart } from './cart.js';
import { CartNotFoundError } from './cartNotFoundError.js';
import type { CartRepository } from './cartRepository.js';
import type { CustomerId } from './customerId.js';

class CartRepositoryOnMemory implements CartRepository {
  private readonly aggregates: Map<CustomerId, Cart> = new Map<
    CustomerId,
    Cart
  >();

  findById(aggregateId: CustomerId): ResultAsync<Cart, CartNotFoundError> {
    const aggregate = this.aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(CartNotFoundError.create(aggregateId));
  }

  store(aggregate: Cart): ResultAsync<void, never> {
    this.aggregates.set(aggregate.aggregateId, aggregate);
    return okAsync();
  }

  deleteById(aggregateId: CustomerId): ResultAsync<void, never> {
    this.aggregates.delete(aggregateId);
    return okAsync();
  }
}

export { CartRepositoryOnMemory };
