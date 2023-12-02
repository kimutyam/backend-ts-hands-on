import type { ProductId } from '../90_entity_id/productId';
import type { DiscountRate } from './discountRate';

export type DiscountCondition = Readonly<{
  productId: ProductId;
  rate: DiscountRate;
}>;
