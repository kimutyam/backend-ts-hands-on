import type { ProductId } from '7_aggregate/1/productId.js';

interface Product {
  readonly aggregateId: ProductId;
  readonly name: string;
  readonly price: number;
}

export type { Product };
