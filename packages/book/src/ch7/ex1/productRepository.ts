import type { Product } from 'ch7/ex1/product.js';
import type { ProductId } from 'ch7/ex1/productId.js';

interface IProductRepository {
  findById: (aggregateId: ProductId) => Promise<Product | undefined>;

  findAll: () => Promise<ReadonlyArray<Product>>;

  save: (product: Product) => Promise<void>;
  deleteById: (aggregateId: ProductId) => Promise<void>;
}

export type { IProductRepository, Product };
