import { errAsync, okAsync } from 'neverthrow';

import type { Cart } from '../../../../app/domain/cart/cart.js';
import { CartNotFoundError } from '../../../../app/domain/cart/cartNotFoundError.js';
import type { CustomerId } from '../../../../app/domain/customer/customerId.js';
import type { StoreCartEvent } from '../../../../app/port/secondary/db/cartEventStore.js';
import type { FindCartById } from '../../../../app/port/secondary/db/cartRepository.js';

const buildFindById =
  (aggregates: Map<CustomerId, Cart>): FindCartById =>
  (aggregateId) => {
    const aggregate = aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(new CartNotFoundError(aggregateId));
  };

const buildStore =
  (aggregates: Map<CustomerId, Cart>): StoreCartEvent =>
  async (event, aggregate) => {
    console.log(event);
    aggregates.set(aggregate.aggregateId, aggregate);
    return Promise.resolve();
  };

const buildRepository = (
  initialAggregates: Map<CustomerId, Cart> = new Map(),
) => {
  const aggregates = new Map(initialAggregates);
  return {
    findById: buildFindById(aggregates),
    store: buildStore(aggregates),
  };
};

const CartRepository = {
  build: buildRepository,
} as const;

export { CartRepository };
