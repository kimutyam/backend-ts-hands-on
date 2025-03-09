import type { ProductId } from 'chx/ex10/domain/product/productId.js';

export class ProductsNotFoundError extends Error {
  constructor(
    message: string,
    public productIds: ReadonlyArray<ProductId>,
  ) {
    super(message);
    this.name = 'ProductsNotFoundError';
  }
}
