import { errAsync, okAsync } from 'neverthrow';

import type { Cart } from '../../../app/domain/cart/cart.js';
import type { CartEvent } from '../../../app/domain/cart/cartEvent.js';
import { CartNotFoundError } from '../../../app/domain/cart/cartNotFoundError.js';
import type { CustomerId } from '../../../app/domain/customer/customerId.js';
import type { StoreCartEvent } from '../../../app/port/secondary/cartEventStore.js';
import type { FindCartById } from '../../../app/port/secondary/cartRepository.js';

const buildFindById =
  (aggregates: Map<CustomerId, Cart>): FindCartById =>
  (aggregateId) => {
    const aggregate = aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(new CartNotFoundError(aggregateId));
  };

const buildStore =
  (aggregates: Map<CustomerId, Cart>): StoreCartEvent<CartEvent> =>
  async (event: CartEvent, aggregate: Cart) => {
    console.log(event);
    aggregates.set(aggregate.aggregateId, aggregate);
    return Promise.resolve();
  };

const buildRepository = (
  initialAggregates: Map<CustomerId, Cart> = new Map<CustomerId, Cart>(),
) => {
  const aggregates = new Map(initialAggregates);
  return {
    findById: buildFindById(aggregates),
    store: buildStore(aggregates),
  };
};

const CartRepositoryOnMemory = {
  build: buildRepository,
} as const;

export { CartRepositoryOnMemory };
