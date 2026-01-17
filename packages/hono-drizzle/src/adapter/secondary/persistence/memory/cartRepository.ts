import { errAsync, okAsync } from 'neverthrow';

import type { Cart } from '../../../../app/domain/cart/cart.js';
import type { CartEvent } from '../../../../app/domain/cart/cartEvent.js';
import { CartNotFoundError } from '../../../../app/domain/cart/cartNotFoundError.js';
import type { CustomerId } from '../../../../app/domain/customer/customerId.js';
import type { StoreCartEvent } from '../../../../app/port/secondary/persistence/cartEventStore.js';
import type { FindCartById } from '../../../../app/port/secondary/persistence/cartRepository.js';

const createFindByIdFn =
  (aggregates: Map<CustomerId, Cart>): FindCartById =>
  (aggregateId) => {
    const aggregate = aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(CartNotFoundError.create(aggregateId));
  };

const createStoreFn =
  (
    events: Array<CartEvent>,
    aggregates: Map<CustomerId, Cart>,
  ): StoreCartEvent =>
  (event, aggregate) => {
    events.push(event);
    aggregates.set(aggregate.aggregateId, aggregate);
    return Promise.resolve();
  };

const createRepository = (
  initialEvents: Array<CartEvent> = [],
  initialAggregates: Map<CustomerId, Cart> = new Map(),
) => {
  const events = [...initialEvents];
  const aggregates = new Map(initialAggregates);
  return {
    findById: createFindByIdFn(initialAggregates),
    store: createStoreFn(events, aggregates),
  };
};

const CartRepositoryOnMemory = {
  create: createRepository,
} as const;

export { CartRepositoryOnMemory };
