import type { Product } from 'aggregate/10_zod/domain/product/product.js';
import type { ProductId } from 'aggregate/10_zod/domain/product/productId.js';
import { ProductNotFoundError } from 'aggregate/10_zod/domain/product/productNotFoundError.js';
import type { IProductRepository } from 'aggregate/20_repository/domain/productRespository.js';
import { err, ok, ResultAsync } from 'neverthrow';

export class InMemoryProductRepository
  implements IProductRepository
{
  private readonly aggregates: Record<ProductId, Product> =
    {};

  findById(
    aggregateId: ProductId,
  ): ResultAsync<Product, ProductNotFoundError> {
    const aggregate = this.aggregates[aggregateId];
    const result =
      aggregate === undefined
        ? err(new ProductNotFoundError(aggregateId))
        : ok(aggregate);
    const promise = Promise.resolve(result);
    return new ResultAsync(promise);
  }

  findAll(): Promise<ReadonlyArray<Product>> {
    return Promise.resolve(Object.values(this.aggregates));
  }

  save(aggregate: Product): Promise<void> {
    this.aggregates[aggregate.aggregateId] = aggregate;
    return Promise.resolve();
  }

  deleteById(aggregateId: ProductId): Promise<void> {
    delete this.aggregates[aggregateId];
    return Promise.resolve(undefined);
  }
}
