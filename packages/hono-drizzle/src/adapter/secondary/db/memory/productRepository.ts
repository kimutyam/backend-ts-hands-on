import { errAsync, okAsync } from 'neverthrow';

import type { Product } from '../../../../app/domain/product/product.js';
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
  (aggregates: Map<ProductId, Product>): StoreProductEvent =>
  async (event, aggregate) => {
    console.log(event);
    aggregates.set(aggregate.aggregateId, aggregate);
    return Promise.resolve();
  };

const buildRepository = (
  initialAggregates: Map<ProductId, Product> = new Map(),
) => {
  const aggregates = new Map(initialAggregates);
  return {
    findById: buildFindById(aggregates),
    store: buildStore(aggregates),
  };
};

const ProductRepositoryOnMemory = {
  build: buildRepository,
} as const;

export { ProductRepositoryOnMemory };
