import type { ProductId } from './productId.js';

interface Product {
  readonly aggregateId: ProductId;
  readonly name: string;
  readonly price: number;
}

export type { Product };
