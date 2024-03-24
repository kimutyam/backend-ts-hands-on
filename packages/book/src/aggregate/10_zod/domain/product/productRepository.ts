import type { ResultAsync } from 'neverthrow';
import type { Product } from './product';
import type { ProductId } from './productId';
import type { ProductNotFoundError } from './productNotFoundError';
import type { ProductsNotFoundError } from './productsNotFoundError';

export interface ProductResolver {
  resolveBy(productId: ProductId): ResultAsync<Product, ProductNotFoundError>;
}

export interface ProductsResolver {
  resolveIn(
    productId: ReadonlyArray<ProductId>,
  ): ResultAsync<ReadonlyArray<Product>, ProductsNotFoundError>;
}
