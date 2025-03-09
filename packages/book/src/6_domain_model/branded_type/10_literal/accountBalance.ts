import type {
  Brand,
  BrandValue,
} from '6_domain_model/branded_type/10_literal/brand.js';

const tag = 'AccountBalance';
export type AccountBalance = Brand<number, typeof tag>;

export const AccountBalance = (
  value: BrandValue<AccountBalance>,
): AccountBalance => ({
  _tag: tag,
  value,
});

// const build = (value: BrandValue<AccountBalance>): AccountBalance => value as AccountBalance;
