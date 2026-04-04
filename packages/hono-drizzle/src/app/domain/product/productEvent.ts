import type { DomainEvent } from '#/app/domain/domainEvent.js';
import type { Product } from '#/app/domain/product/product.js';
import type { ProductId } from '#/app/domain/product/productId.js';

const ProductRegistered = {
  eventName: 'ProductRegistered' as const,
} as const;

type ProductRegistered = DomainEvent<
  ProductId,
  typeof Product.aggregateName,
  typeof ProductRegistered.eventName,
  { product: Product }
>;

type ProductEvent = ProductRegistered;

export { type ProductEvent, ProductRegistered };
