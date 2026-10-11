import type { Product } from '#/app/domain/product/product.js';
import type { ProductEvent } from '#/app/domain/product/productEvent.js';
import type { ProductNameDuplicatedError } from '#/app/domain/product/productNameDuplicatedError.js';
import type { StoreEvent } from '#/app/port/secondary/persistence/eventStore.js';

type StoreProductEvent<DE extends ProductEvent = ProductEvent> = StoreEvent<
  Product,
  DE,
  ProductNameDuplicatedError
>;

const StoreProductEvent = {
  token: 'StoreProductEvent',
} as const;

export { StoreProductEvent };
