import type { Price } from './price.js';
import type { ProductId } from './productId.js';

interface Product {
  readonly aggregateId: ProductId;
  readonly name: string;
  readonly price: Price;
}

export type { Product };
