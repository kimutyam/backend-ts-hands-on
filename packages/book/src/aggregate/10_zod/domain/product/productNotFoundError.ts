import type { ProductId } from './productId';

export class ProductNotFoundError extends Error {
  constructor(
    message: string,
    public productId: ProductId,
  ) {
    super(message);
    this.name = 'ProductNotFoundError';
  }
}
