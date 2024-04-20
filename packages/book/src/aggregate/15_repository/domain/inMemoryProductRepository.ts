import type { Product } from '../../10_zod/domain/product/product';
import type { ProductId } from '../../10_zod/domain/product/productId';
import type { IProductRespository } from './productRespository';

export class InMemoryProductRepository implements IProductRespository {
  private readonly aggregates: Record<ProductId, Product> = {};

  findById(aggregateId: ProductId): Promise<Product | undefined> {
    return Promise.resolve(this.aggregates[aggregateId]);
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
