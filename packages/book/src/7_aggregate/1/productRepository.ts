import type { Product } from '7_aggregate/1/product.js';
import type { ProductId } from '7_aggregate/1/productId.js';

interface IProductRepository {
  findById: (
    aggregateId: ProductId,
  ) => Promise<Product | undefined>;

  findAll: () => Promise<ReadonlyArray<Product>>;

  save: (product: Product) => Promise<void>;
  deleteById: (aggregateId: ProductId) => Promise<void>;
}

export type { IProductRepository, Product };
