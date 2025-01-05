import type { Product } from './product';

interface ProductRepository {
  readonly save: (product: Product) => Promise<void>;
}

export type { ProductRepository };
