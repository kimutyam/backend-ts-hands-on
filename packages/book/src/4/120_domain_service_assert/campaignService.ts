import { ProductId } from '../90_entity_id/productId';
import type { DiscountCondition } from './discountCondition';
import type { DiscountedProduct } from './discountedProduct';
import { Price } from './price';
import type { Product } from './product';

const discount = (
  product: Product,
  conditions: ReadonlyArray<DiscountCondition>,
): DiscountedProduct => {
  const condition = conditions.find((c) => ProductId.equals(c.productId, product.id));
  if (condition) {
    return { ...product, discountedPrice: Price.discount(condition.rate)(product.price) };
  }
  return product;
};

export const CampaignService = {
  discount,
} as const;
