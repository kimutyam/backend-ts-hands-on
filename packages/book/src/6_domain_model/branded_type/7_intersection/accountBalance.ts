import type { Brand } from './brand.js';

export type AccountBalance = Brand<
  number,
  'AccountBalance'
>;
export const AccountBalance = (
  value: number,
): AccountBalance => value as AccountBalance;
