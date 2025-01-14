import type { Product } from './product';
import type { ProductId } from './productId';

interface IProductRepository {
  findById(aggregateId: ProductId): Promise<Product | undefined>;

  findAll(): Promise<ReadonlyArray<Product>>;

  save(product: Product): Promise<void>;
  deleteById(aggregateId: ProductId): Promise<void>;
}

export type { IProductRepository, Product };
