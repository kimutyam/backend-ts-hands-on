import type { Cart } from '7_aggregate/1/cart.js';
import { CartNotFoundError } from '7_aggregate/1/cartNotFoundError.js';
import type { CustomerId } from '7_aggregate/1/customerId.js';
import type {
  DeleteCartById,
  FindCartById,
  SaveCart,
} from '7_aggregate/2_isp/cartRepository.js';
import { errAsync, okAsync } from 'neverthrow';

const buildFindCartById =
  (aggregates: Map<CustomerId, Cart>): FindCartById =>
  (aggregateId: CustomerId) => {
    const aggregate = aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(new CartNotFoundError(aggregateId));
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

export {
  buildFindCartById,
  buildSaveCart,
  buildDeleteCartById,
};
