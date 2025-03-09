import type {
  Brand,
  BrandValue,
} from '6_domain_model/branded_type/10_literal/brand.js';

const tag = 'CustomerId';
export type CustomerId = Brand<number, typeof tag>;

export const CustomerId = (
  value: BrandValue<CustomerId>,
): CustomerId => ({
  _tag: tag,
  value,
});
