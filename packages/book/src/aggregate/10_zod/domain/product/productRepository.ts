import type { Product } from 'aggregate/10_zod/domain/product/product.js';
import type { ProductId } from 'aggregate/10_zod/domain/product/productId.js';
import type { ProductNotFoundError } from 'aggregate/10_zod/domain/product/productNotFoundError.js';
import type { ProductsNotFoundError } from 'aggregate/10_zod/domain/product/productsNotFoundError.js';
import type { ResultAsync } from 'neverthrow';

export interface ProductResolver {
  resolveBy: (
    productId: ProductId,
  ) => ResultAsync<Product, ProductNotFoundError>;
}

export interface ProductsResolver {
  resolveIn: (
    productId: ReadonlyArray<ProductId>,
  ) => ResultAsync<
    ReadonlyArray<Product>,
    ProductsNotFoundError
  >;
}
