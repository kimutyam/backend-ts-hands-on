import type { Product } from 'chx/ex10/domain/product/product.js';
import type { ProductId } from 'chx/ex10/domain/product/productId.js';
import type { ProductNotFoundError } from 'chx/ex10/domain/product/productNotFoundError.js';
import type { ResultAsync } from 'neverthrow';

export interface IProductRepository {
  findById: (
    aggregateId: ProductId,
  ) => ResultAsync<Product, ProductNotFoundError>;

  findAll: () => Promise<ReadonlyArray<Product>>;

  save: (product: Product) => Promise<void>;
  deleteById: (aggregateId: ProductId) => Promise<void>;
}
