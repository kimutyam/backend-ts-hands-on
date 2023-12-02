import type { Price } from './price';
import type { Product } from './product';

export type DiscountedProduct = Product & { discountedPrice?: Price };
