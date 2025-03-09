import type { ProductId } from 'ch7/ex1/productId.js';

interface Product {
  readonly aggregateId: ProductId;
  readonly name: string;
  readonly price: number;
}

export type { Product };
