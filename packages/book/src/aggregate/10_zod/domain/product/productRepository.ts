import type { ResultAsync } from 'neverthrow';
import type { Product } from './product';
import type { ProductId } from './productId';
import type { ProductNotFoundError } from './productNotFoundError';

export interface ProductResolver {
  resolveBy(productId: ProductId): ResultAsync<Product, ProductNotFoundError>;
}
