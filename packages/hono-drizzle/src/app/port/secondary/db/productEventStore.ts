import type { Product } from '../../../domain/product/product.js';
import type { ProductEvent } from '../../../domain/product/productEvent.js';

interface StoreProductEvent<DE extends ProductEvent = ProductEvent> {
  (event: DE, aggregate: Product): Promise<void>;
}
const StoreProductEvent = {
  token: 'StoreProductEvent' as const,
} as const;

export { StoreProductEvent };
