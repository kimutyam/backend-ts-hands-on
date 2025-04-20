import type { Brand, BrandValue } from 'ch6/archive/branded_type/ex10/brand.js';

const tag = 'CustomerId';
export type CustomerId = Brand<number, typeof tag>;

export const CustomerId = (value: BrandValue<CustomerId>): CustomerId => ({
  _tag: tag,
  value,
});
