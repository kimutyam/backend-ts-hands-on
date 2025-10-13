import type { ResultAsync } from 'neverthrow';

import type { Product } from '../../../domain/product/product.js';
import type { ProductEvent } from '../../../domain/product/productEvent.js';
import type { ProductNameDuplicatedError } from '../../../domain/product/productNameDuplicatedError.js';

interface StoreProductEvent<DE extends ProductEvent = ProductEvent> {
  (
    event: DE,
    aggregate: Product,
  ): ResultAsync<void, ProductNameDuplicatedError>;
}

const StoreProductEvent = {
  token: 'StoreProductEvent' as const,
} as const;

export { StoreProductEvent };
