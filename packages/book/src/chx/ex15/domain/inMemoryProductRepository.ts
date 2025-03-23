import type { Product } from 'chx/ex10/domain/product/product.js';
import type { ProductId } from 'chx/ex10/domain/product/productId.js';
import type { IProductRepository } from 'chx/ex15/domain/productRespository.js';

export class InMemoryProductRepository implements IProductRepository {
  private readonly aggregates: Record<ProductId, Product> = {};

  findById(aggregateId: ProductId): Promise<Product | undefined> {
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
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.aggregates[aggregateId];
    return Promise.resolve(undefined);
  }
}
