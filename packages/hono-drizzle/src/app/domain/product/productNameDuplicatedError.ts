import type { ProductId } from './productId.js';

class ProductNameDuplicatedError extends Error {
  constructor(
    message: string,
    public readonly productId: ProductId,
    public readonly productName: string,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export { ProductNameDuplicatedError };
