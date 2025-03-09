import type { Product } from 'aggregate/10_zod/domain/product/product.js';
import type { ProductId } from 'aggregate/10_zod/domain/product/productId.js';
import type { IProductRepository } from 'aggregate/15_repository/domain/productRespository.js';

export class InMemoryProductRepository
  implements IProductRepository
{
  private readonly aggregates: Record<ProductId, Product> =
    {};

  findById(
    aggregateId: ProductId,
  ): Promise<Product | undefined> {
    return Promise.resolve(this.aggregates[aggregateId]);
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
