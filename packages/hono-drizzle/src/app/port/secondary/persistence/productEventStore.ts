import type { Product } from '../../../domain/product/product.js';
import type { ProductEvent } from '../../../domain/product/productEvent.js';
import type { ProductNameDuplicatedError } from '../../../domain/product/productNameDuplicatedError.js';
import type { StoreEvent } from './eventStore.js';

type StoreProductEvent<DE extends ProductEvent = ProductEvent> = StoreEvent<
  Product,
  DE,
  ProductNameDuplicatedError
>;

const StoreProductEvent = {
  token: 'StoreProductEvent',
} as const;

export { StoreProductEvent };
