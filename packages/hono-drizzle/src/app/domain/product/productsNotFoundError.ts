import type { ProductId } from './productId.js';

export class ProductsNotFoundError extends Error {
  constructor(
    message: string,
    public productIds: ReadonlyArray<ProductId>,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
