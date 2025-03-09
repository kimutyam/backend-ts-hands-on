import type { Brand } from '6_domain_model/branded_type/7_intersection/brand.js';

export type AccountBalance = Brand<
  number,
  'AccountBalance'
>;
export const AccountBalance = (
  value: number,
): AccountBalance => value as AccountBalance;
