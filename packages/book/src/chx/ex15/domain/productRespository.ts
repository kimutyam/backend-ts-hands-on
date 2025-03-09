import type { Product } from 'chx/ex10/domain/product/product.js';
import type { ProductId } from 'chx/ex10/domain/product/productId.js';

export interface IProductRepository {
  findById: (
    aggregateId: ProductId,
  ) => Promise<Product | undefined>;

  findAll: () => Promise<ReadonlyArray<Product>>;

  save: (product: Product) => Promise<void>;
  deleteById: (aggregateId: ProductId) => Promise<void>;
}
