import type { Brand, BrandValue } from 'ch6/branded_type/ex10/brand.js';

const tag = 'AccountBalance';
type AccountBalance = Brand<number, typeof tag>;

const AccountBalance = (value: BrandValue<AccountBalance>): AccountBalance => ({
  _tag: tag,
  value,
});

// const build = (
//   value: BrandValue<AccountBalance>,
// ): AccountBalance => value as AccountBalance;

export { AccountBalance };
