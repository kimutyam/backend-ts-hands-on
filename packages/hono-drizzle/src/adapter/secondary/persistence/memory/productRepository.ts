import { errAsync, okAsync } from 'neverthrow';

import type { Product } from '../../../../app/domain/product/product.js';
import type { ProductEvent } from '../../../../app/domain/product/productEvent.js';
import type { ProductId } from '../../../../app/domain/product/productId.js';
import { ProductNotFoundError } from '../../../../app/domain/product/productNotFoundError.js';
import type { StoreProductEvent } from '../../../../app/port/secondary/persistence/productEventStore.js';
import type { FindProductById } from '../../../../app/port/secondary/persistence/productRepository.js';

const createFindByIdFn =
  (aggregates: Map<ProductId, Product>): FindProductById =>
  (aggregateId) => {
    const aggregate = aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(ProductNotFoundError.create(aggregateId));
  };

const createStoreFn =
  (
    events: Array<ProductEvent>,
    aggregates: Map<ProductId, Product>,
  ): StoreProductEvent =>
  (event, aggregate) => {
    events.push(event);
    aggregates.set(aggregate.aggregateId, aggregate);
    return okAsync();
  };

const createRepository = (
  initialEvents: Array<ProductEvent> = [],
  initialAggregates: Map<ProductId, Product> = new Map(),
) => {
  const events = [...initialEvents];
  const aggregates = new Map(initialAggregates);
  return {
    findById: createFindByIdFn(aggregates),
    store: createStoreFn(events, aggregates),
  };
};

const ProductRepository = {
  create: createRepository,
} as const;

export { ProductRepository };
