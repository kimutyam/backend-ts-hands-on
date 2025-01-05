import type { Brand, BrandValue } from './brand';

const tag = 'AccountBalance';
export type AccountBalance = Brand<number, typeof tag>;

export const AccountBalance = (value: BrandValue<AccountBalance>): AccountBalance => ({
  _tag: tag,
  value,
});

// const build = (value: BrandValue<AccountBalance>): AccountBalance => value as AccountBalance;
