import type { Product } from './product.js';

interface ProductRepository {
  readonly save: (product: Product) => Promise<void>;
}

export type { ProductRepository };
