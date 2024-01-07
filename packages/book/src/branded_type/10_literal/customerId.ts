import type { Brand, BrandValue } from './brand';

const tag = 'CustomerId';
export type CustomerId = Brand<number, typeof tag>;

export const CustomerId = (value: BrandValue<CustomerId>): CustomerId => ({
  _tag: tag,
  value,
});
