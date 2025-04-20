import type { Brand } from 'ch6/archive/branded_type/ex7/brand.js';

export type AccountBalance = Brand<number, 'AccountBalance'>;
export const AccountBalance = (value: number): AccountBalance =>
  value as AccountBalance;
