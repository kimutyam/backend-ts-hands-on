import type { DomainEvent } from '../domainEvent.js';
import type { Product } from './product.js';
import type { ProductId } from './productId.js';

const ProductRegistered = {
  eventName: 'ProductRegistered' as const,
} as const;

type ProductRegistered = DomainEvent<
  ProductId,
  typeof Product.name,
  typeof ProductRegistered.eventName,
  { product: Product }
>;

type ProductEvent = ProductRegistered;

export { type ProductEvent, ProductRegistered };
