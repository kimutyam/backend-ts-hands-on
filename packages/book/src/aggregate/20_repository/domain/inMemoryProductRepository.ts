import { err, ok, ResultAsync } from 'neverthrow';
import type { Product } from '../../10_zod/domain/product/product';
import type { ProductId } from '../../10_zod/domain/product/productId';
import { ProductNotFoundError } from '../../10_zod/domain/product/productNotFoundError';
import type { IProductRespository } from './productRespository';

export class InMemoryProductRepository implements IProductRespository {
  private readonly aggregates: Record<ProductId, Product> = {};

  findById(aggregateId: ProductId): ResultAsync<Product, ProductNotFoundError> {
    const aggregate = this.aggregates[aggregateId];
    const result =
      aggregate === undefined ? err(new ProductNotFoundError(aggregateId)) : ok(aggregate);
    const promise = Promise.resolve(result);
    return new ResultAsync(promise);
  }

  findAll(): Promise<ReadonlyArray<Product>> {
    return Promise.resolve(Object.values(this.aggregates));
  }

  save(aggregate: Product): Promise<void> {
    this.aggregates[aggregate.productId] = aggregate;
    return Promise.resolve();
  }

  deleteById(aggregateId: ProductId): Promise<void> {
    delete this.aggregates[aggregateId];
    return Promise.resolve(undefined);
  }
}
