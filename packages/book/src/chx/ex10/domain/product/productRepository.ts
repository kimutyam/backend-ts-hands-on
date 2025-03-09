import type { Product } from 'chx/ex10/domain/product/product.js';
import type { ProductId } from 'chx/ex10/domain/product/productId.js';
import type { ProductNotFoundError } from 'chx/ex10/domain/product/productNotFoundError.js';
import type { ProductsNotFoundError } from 'chx/ex10/domain/product/productsNotFoundError.js';
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
