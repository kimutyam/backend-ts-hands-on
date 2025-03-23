import type { Product } from 'chx/ex10/domain/product/product.js';
import type { ProductId } from 'chx/ex10/domain/product/productId.js';
import { ProductNotFoundError } from 'chx/ex10/domain/product/productNotFoundError.js';
import type { IProductRepository } from 'chx/ex20/domain/productRespository.js';
import { err, ok, ResultAsync } from 'neverthrow';

export class InMemoryProductRepository implements IProductRepository {
  private readonly aggregates: Record<ProductId, Product> = {};

  findById = (
    aggregateId: ProductId,
  ): ResultAsync<Product, ProductNotFoundError> => {
    const aggregate = this.aggregates[aggregateId];
    const result =
      aggregate === undefined
        ? err(new ProductNotFoundError(aggregateId))
        : ok(aggregate);
    const promise = Promise.resolve(result);
    return new ResultAsync(promise);
  };

  findAll = (): Promise<ReadonlyArray<Product>> =>
    Promise.resolve(Object.values(this.aggregates));

  save = (aggregate: Product): Promise<void> => {
    this.aggregates[aggregate.aggregateId] = aggregate;
    return Promise.resolve();
  };

  deleteById = (aggregateId: ProductId): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.aggregates[aggregateId];
    return Promise.resolve(undefined);
  };
}
