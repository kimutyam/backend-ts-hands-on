import type { ProductId } from './productId';

export class ProductsNotFoundError extends Error {
  constructor(
    message: string,
    public productIds: ReadonlyArray<ProductId>,
  ) {
    super(message);
    this.name = 'ProductsNotFoundError';
  }
}
