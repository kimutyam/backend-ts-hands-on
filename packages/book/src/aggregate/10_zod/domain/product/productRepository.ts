import type { ResultAsync } from 'neverthrow';
import type { Product } from './product.js';
import type { ProductId } from './productId.js';
import type { ProductNotFoundError } from './productNotFoundError.js';
import type { ProductsNotFoundError } from './productsNotFoundError.js';

export interface ProductResolver {
  resolveBy: (productId: ProductId) => ResultAsync<Product, ProductNotFoundError>;
}

export interface ProductsResolver {
  resolveIn: (
    productId: ReadonlyArray<ProductId>,
  ) => ResultAsync<ReadonlyArray<Product>, ProductsNotFoundError>;
}
