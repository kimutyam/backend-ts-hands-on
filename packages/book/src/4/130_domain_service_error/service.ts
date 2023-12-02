import type { DiscountCondition } from '../120_domain_service_assert/discountCondition';
import type { DiscountedProduct } from '../120_domain_service_assert/discountedProduct';
import { ProductId } from '../90_entity_id/productId';
import { Price } from './price';
import type { Product } from './product';

const discount = (
  product: Product,
  conditions: ReadonlyArray<DiscountCondition>,
): DiscountedProduct => {
  const condition = conditions.find((c) => ProductId.equals(c.productId, product.id));
  if (condition) {
    const discountResult = Price.discount(condition.rate)(product.price);
    if (discountResult.success) {
      return { ...product, discountedPrice: discountResult.data };
    }
  }
  return product;
};

export const CampaignService = {
  discount,
} as const;
