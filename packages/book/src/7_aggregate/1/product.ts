import type { ProductId } from './productId';

interface Product {
  readonly aggregateId: ProductId;
  readonly name: string;
  readonly price: number;
}

export type { Product };
