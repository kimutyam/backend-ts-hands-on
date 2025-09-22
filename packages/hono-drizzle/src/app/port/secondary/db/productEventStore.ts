import type { Product } from '../../../domain/product/product.js';
import type { ProductEvent } from '../../../domain/product/productEvent.js';
import { ResultAsync } from 'neverthrow';
import { ProductNameDuplicatedError } from '../../../domain/product/productNameDuplicatedError.js';

interface StoreProductEvent<DE extends ProductEvent = ProductEvent> {
  (
    event: DE,
    aggregate: Product,
  ): ResultAsync<void, ProductNameDuplicatedError | undefined>;
}
const StoreProductEvent = {
  token: 'StoreProductEvent' as const,
} as const;

export { StoreProductEvent };
