import { errAsync, okAsync } from 'neverthrow';
import type { Cart } from '../1/cart';
import { CartNotFoundError } from '../1/cartNotFoundError';
import type { CustomerId } from '../1/customerId';
import type { DeleteCartById, FindCartById, SaveCart } from './cartRepository';

const buildFindCartById =
  (aggregates: Map<CustomerId, Cart>): FindCartById =>
  (aggregateId: CustomerId) => {
    const aggregate = aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(new CartNotFoundError('カートが空です', aggregateId));
  };

const buildSaveCart =
  (aggregates: Map<CustomerId, Cart>): SaveCart =>
  (aggregate: Cart) => {
    aggregates.set(aggregate.aggregateId, aggregate);
    return Promise.resolve(undefined);
  };

const buildDeleteCartById =
  (aggregates: Map<CustomerId, Cart>): DeleteCartById =>
  (aggregateId: CustomerId) => {
    aggregates.delete(aggregateId);
    return Promise.resolve(undefined);
  };

export { buildFindCartById, buildSaveCart, buildDeleteCartById };
