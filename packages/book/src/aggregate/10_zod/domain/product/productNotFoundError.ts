import type { ProductId } from './productId.js';

export class ProductNotFoundError extends Error {
  constructor(public productId: ProductId) {
    super(`商品ID: ${productId} の商品が見つかりませんでした`);
    this.name = 'ProductNotFoundError';
  }
}
