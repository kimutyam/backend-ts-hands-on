import type { ProductId } from 'aggregate/10_zod/domain/product/productId.js';

export class ProductsNotFoundError extends Error {
  constructor(
    message: string,
    public productIds: ReadonlyArray<ProductId>,
  ) {
    super(message);
    this.name = 'ProductsNotFoundError';
  }
}
