import type { Cart } from 'ch7/ex1/cart.js';
import { CartNotFoundError } from 'ch7/ex1/cartNotFoundError.js';
import type { CustomerId } from 'ch7/ex1/customerId.js';
import type {
  DeleteCartById,
  FindCartById,
  SaveCart,
} from 'ch7/ex2/cartRepository.js';
import { errAsync, okAsync } from 'neverthrow';

const buildFindCartById =
  (aggregates: Map<CustomerId, Cart>): FindCartById =>
  (aggregateId: CustomerId) => {
    const aggregate = aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(CartNotFoundError.create(aggregateId));
  };

const buildSaveCart =
  (aggregates: Map<CustomerId, Cart>): SaveCart =>
  (aggregate: Cart) => {
    aggregates.set(aggregate.aggregateId, aggregate);
    return Promise.resolve();
  };

const buildDeleteCartById =
  (aggregates: Map<CustomerId, Cart>): DeleteCartById =>
  (aggregateId: CustomerId) => {
    aggregates.delete(aggregateId);
    return Promise.resolve();
  };

buildFindCartById.inject = ['aggregates'] as const;

export { buildDeleteCartById, buildFindCartById, buildSaveCart };
