import type { Product } from '../90_entity_id/product';

export type DiscountedProduct = Product & { discountedPrice?: number };
