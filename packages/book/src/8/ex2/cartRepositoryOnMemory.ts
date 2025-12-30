import { errAsync, okAsync } from 'neverthrow';

import type { Cart } from '../ex1/cart.js';
import { CartNotFoundError } from '../ex1/cartNotFoundError.js';
import type { CustomerId } from '../ex1/customerId.js';
import type {
  DeleteCartById,
  FindCartById,
  StoreCart,
} from './cartRepository.js';

const createFindByIdFn =
  (aggregates: Map<CustomerId, Cart>): FindCartById =>
  (aggregateId: CustomerId) => {
    const aggregate = aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(CartNotFoundError.create(aggregateId));
  };

const createStoreFn =
  (aggregates: Map<CustomerId, Cart>): StoreCart =>
  (aggregate: Cart) => {
    aggregates.set(aggregate.aggregateId, aggregate);
    return Promise.resolve();
  };

const createDeleteByIdFn =
  (aggregates: Map<CustomerId, Cart>): DeleteCartById =>
  (aggregateId: CustomerId) => {
    aggregates.delete(aggregateId);
    return Promise.resolve();
  };

const createRepository = (
  initialAggregates: Map<CustomerId, Cart> = new Map<CustomerId, Cart>(),
) => {
  const aggregates = new Map(initialAggregates);
  return {
    findById: createFindByIdFn(aggregates),
    store: createStoreFn(aggregates),
    deleteById: createDeleteByIdFn(aggregates),
  };
};

const CartRepository = {
  create: createRepository,
} as const;

export { CartRepository };
