import type { ProductId } from 'chx/ex10/domain/product/productId.js';

export class ProductNotFoundError extends Error {
  constructor(public productId: ProductId) {
    super(`商品ID: ${productId} の商品が見つかりませんでした`);
    this.name = this.constructor.name;
  }
}
