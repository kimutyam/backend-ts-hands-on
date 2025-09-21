import { errAsync, okAsync } from 'neverthrow';

import type { Product } from '../../../../app/domain/product/product.js';
import type { ProductEvent } from '../../../../app/domain/product/productEvent.js';
import type { ProductId } from '../../../../app/domain/product/productId.js';
import { ProductNotFoundError } from '../../../../app/domain/product/productNotFoundError.js';
import type { StoreProductEvent } from '../../../../app/port/secondary/db/productEventStore.js';
import type { FindProductById } from '../../../../app/port/secondary/db/productRepository.js';

const buildFindById =
  (aggregates: Map<ProductId, Product>): FindProductById =>
  (aggregateId) => {
    const aggregate = aggregates.get(aggregateId);
    return aggregate
      ? okAsync(aggregate)
      : errAsync(new ProductNotFoundError(aggregateId));
  };

const buildStore =
  (
    events: Array<ProductEvent>,
    aggregates: Map<ProductId, Product>,
  ): StoreProductEvent =>
  async (event, aggregate) => {
    events.push(event);
    aggregates.set(aggregate.aggregateId, aggregate);
    return Promise.resolve();
  };

const buildRepository = (
  initialEvents: Array<ProductEvent> = [],
  initialAggregates: Map<ProductId, Product> = new Map(),
) => {
  const events = [...initialEvents];
  const aggregates = new Map(initialAggregates);
  return {
    findById: buildFindById(aggregates),
    store: buildStore(events, aggregates),
  };
};

const ProductRepository = {
  build: buildRepository,
} as const;

export { ProductRepository };
